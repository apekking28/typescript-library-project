import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { Prisma, Book } from '@prisma/client';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  async createBook(data: Prisma.BookCreateInput): Promise<Book> {
    const existingBook = await this.prisma.book.findUnique({
      where: { code: data.code },
    });

    if (existingBook) {
      throw new ConflictException('A book with this code already exists');
    }

    return this.prisma.book.create({
      data: {
        ...data,
      },
    });
  }

  async getBooks(): Promise<Book[]> {
    return this.prisma.book.findMany({
      where: { stock: { gt: 0 } },
    });
  }

  async getAllBooks(): Promise<Book[]> {
    return this.prisma.book.findMany();
  }
}
