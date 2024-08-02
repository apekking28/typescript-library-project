import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { Book } from '@prisma/client';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new book' })
  @ApiBody({ type: CreateBookDto })
  @ApiResponse({ status: 201, description: 'The book has been successfully created.' })
  @ApiResponse({ status: 409, description: 'A book with this code already exists.' })
  async create(@Body() createBookDto: CreateBookDto): Promise<Book> {
    return this.booksService.createBook(createBookDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all available books' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved list of available books.' })
  async getBooks(): Promise<Book[]> {
    return this.booksService.getBooks();
  }

  @Get('all')
  @ApiOperation({ summary: 'Get all books' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved list of all books.' })
  async getAllBooks(): Promise<Book[]> {
    return this.booksService.getAllBooks();
  }
}
