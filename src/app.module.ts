import { Module } from '@nestjs/common';
import { BooksModule } from './books/books.module';
import { MembersModule } from './members/members.module';
import { PrismaService } from './common/prisma.service';

@Module({
  imports: [BooksModule, MembersModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
