import { Controller, Get, Post, Body, Param, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { MembersService } from './members.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { Member } from '@prisma/client';

@ApiTags('members')
@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new member' })
  @ApiBody({ type: CreateMemberDto })
  @ApiResponse({ status: 201, description: 'The member has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  async create(@Body() createMemberDto: CreateMemberDto): Promise<Member> {
    return this.membersService.createMember(createMemberDto);
  }

  @Post(':memberId/borrow/:bookId')
  @ApiOperation({ summary: 'Borrow a book' })
  @ApiParam({ name: 'memberId', description: 'ID of the member' })
  @ApiParam({ name: 'bookId', description: 'ID of the book' })
  @ApiResponse({ status: 200, description: 'The book has been successfully borrowed.' })
  @ApiResponse({ status: 400, description: 'Invalid input or business logic violation.' })
  async borrowBook(
    @Param('memberId') memberId: string,
    @Param('bookId') bookId: string,
  ): Promise<void> {
    return this.membersService.borrowBook(Number(memberId), Number(bookId));
  }

  @Post(':memberId/return/:bookId')
  @ApiOperation({ summary: 'Return a book' })
  @ApiParam({ name: 'memberId', description: 'ID of the member' })
  @ApiParam({ name: 'bookId', description: 'ID of the book' })
  @ApiResponse({ status: 200, description: 'The book has been successfully returned.' })
  @ApiResponse({ status: 400, description: 'Invalid input or business logic violation.' })
  async returnBook(
    @Param('memberId') memberId: string,
    @Param('bookId') bookId: string,
  ): Promise<void> {
    return this.membersService.returnBook(Number(memberId), Number(bookId));
  }

  @Get()
  @ApiOperation({ summary: 'Get all members' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved list of members.' })
  async getMembers(): Promise<Member[]> {
    return this.membersService.getMembers();
  }
}
