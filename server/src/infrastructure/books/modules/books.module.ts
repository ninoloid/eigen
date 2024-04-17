import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IBookRepository } from '../../../domain/books/repositories/IBookRepository';
import { BookRepository } from '../repositories/BookRepository';
import { IBookService } from '../../../domain/books/interfaces/IBookService';
import { BookService } from '../../../application/books/BookService';
import { GetBooksController } from '../controllers/GetBooksController';
import { Book } from '../../../domain/books/entities/books.entity';
import { BorrowBookController } from '../controllers/BorrowBookController';
import { IBorrowBookService } from '../../../domain/books/interfaces/IBorrowBookService';
import { BorrowBookService } from '../../../application/books/BorrowBookService';
import { BorrowedBook } from '../../../domain/books/entities/borrowedBooks.entity';
import { IMemberService } from '../../../domain/members/interfaces/IMemberService';
import { MemberService } from '../../../application/members/MemberService';
import { Member } from '../../../domain/members/entities/members.entity';
import { IMemberRepository } from '../../../domain/members/repositories/IMemberRepository';
import { MemberRepository } from '../../../infrastructure/members/repositories/MemberRepository';
import { IBorrowedBookRepository } from '../../../domain/books/repositories/IBorrowedBookRepository';
import { BorrowedBookRepository } from '../repositories/BorrowedBookRepository';
import { ReturnBookController } from '../controllers/ReturnBookController';

@Module({
  imports: [TypeOrmModule.forFeature([Book, BorrowedBook, Member])],
  controllers: [GetBooksController, BorrowBookController, ReturnBookController],
  providers: [
    {
      provide: IBookRepository,
      useClass: BookRepository,
    },
    {
      provide: IMemberRepository,
      useClass: MemberRepository,
    },
    {
      provide: IBorrowedBookRepository,
      useClass: BorrowedBookRepository,
    },
    {
      provide: IBookService,
      useClass: BookService,
    },
    {
      provide: IMemberService,
      useClass: MemberService,
    },
    {
      provide: IBorrowBookService,
      useClass: BorrowBookService,
    },
  ],
})
export class BooksModule {}
