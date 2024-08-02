import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { Prisma, Member } from '@prisma/client';
import { CreateMemberDto } from './dto/create-member.dto';

@Injectable()
export class MembersService {
  constructor(private prisma: PrismaService) {}

  async createMember(data: CreateMemberDto): Promise<Member> {
    return this.prisma.member.create({
      data: {
        ...data,
        code: data.code,
      },
    });
  }

  async borrowBook(memberId: number, bookId: number): Promise<void> {
    const member = await this.prisma.member.findUnique({
      where: { id: memberId },
      include: { borrowed: true, penalties: true },
    });

    if (!member) {
      throw new NotFoundException('Member not found');
    }

    if (member.penalties.some(penalty => new Date(penalty.endDate) > new Date())) {
      throw new BadRequestException('Member is currently penalized');
    }

    if (member.borrowed.length >= 2) {
      throw new BadRequestException('Member cannot borrow more than 2 books');
    }

    const book = await this.prisma.book.findUnique({ where: { id: bookId } });

    if (!book || book.stock < 1) {
      throw new BadRequestException('Book is not available');
    }

    await this.prisma.borrowedBook.create({
      data: {
        memberId,
        bookId,
      },
    });

    await this.prisma.book.update({
      where: { id: bookId },
      data: { stock: { decrement: 1 } },
    });
  }

  async returnBook(memberId: number, bookId: number): Promise<void> {
    const borrowedBook = await this.prisma.borrowedBook.findFirst({
      where: { memberId, bookId, returnDate: null },
    });

    if (!borrowedBook) {
      throw new BadRequestException('This book was not borrowed by the member');
    }

    const now = new Date();
    const borrowDate = new Date(borrowedBook.borrowDate);
    const diffDays = Math.floor((now.getTime() - borrowDate.getTime()) / (1000 * 3600 * 24));

    await this.prisma.borrowedBook.update({
      where: { id: borrowedBook.id },
      data: { returnDate: now },
    });

    await this.prisma.book.update({
      where: { id: bookId },
      data: { stock: { increment: 1 } },
    });

    if (diffDays > 7) {
      await this.prisma.penalty.create({
        data: {
          memberId,
          startDate: now,
          endDate: new Date(now.getTime() + 3 * 24 * 3600 * 1000),
        },
      });
    }
  }

  async getMembers(): Promise<Member[]> {
    return this.prisma.member.findMany({
      include: {
        borrowed: true,
      },
    });
  }
}
