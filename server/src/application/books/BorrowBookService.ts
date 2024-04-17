import { Inject, Injectable } from '@nestjs/common';
import { Book } from '../../domain/books/entities/books.entity';
import { IBorrowBookService } from '../../domain/books/interfaces/IBorrowBookService';
import { IBorrowedBookRepository } from '../../domain/books/repositories/IBorrowedBookRepository';
import { BorrowBookDto } from './dtos/BorrowBookDto';
import { IBookService } from '../../domain/books/interfaces/IBookService';
import { IMemberService } from '../../domain/members/interfaces/IMemberService';
import {
  BorrowedBookQtyExceededException,
  BookNotFoundException,
  BookOutOfStockException,
  MemberNotFoundException,
  MemberPenalizedException,
} from './exceptions/BorrowBookException';
import { BorrowedBook } from 'src/domain/books/entities/borrowedBooks.entity';
import { differenceInDays, format, isAfter } from 'date-fns';
import { BookNotBorrowedException } from './exceptions/ReturnBookException';

@Injectable()
export class BorrowBookService implements IBorrowBookService {
  constructor(
    @Inject(IBorrowedBookRepository)
    private readonly borrowBookRepository: IBorrowedBookRepository,

    @Inject(IBookService)
    private readonly bookService: IBookService,

    @Inject(IMemberService)
    private readonly memberService: IMemberService,
  ) {}

  async borrow(payload: BorrowBookDto): Promise<BorrowedBook> {
    const { bookId, memberId } = payload;

    const member = await this.memberService.findOneById(memberId);

    if (!member) {
      throw new MemberNotFoundException(memberId);
    }

    if (member.isPenalized) {
      const today = new Date();
      const penalizedUntil = member.penalizedUntil;
      const isAlreadyAllowedToBorrow = isAfter(today, penalizedUntil);

      if (!isAlreadyAllowedToBorrow) {
        const until = format(penalizedUntil, 'MMMM dd yyyy');
        throw new MemberPenalizedException(memberId, until);
      }

      this.memberService.removePenalty(memberId);
    }

    const borrowedBooks = await this.borrowBookRepository.findUserBorrowedBooks(
      memberId,
    );

    if (borrowedBooks.length >= 2) {
      throw new BorrowedBookQtyExceededException();
    }

    const book = await this.bookService.findOneById(bookId);

    if (!book) {
      throw new BookNotFoundException(bookId);
    }

    if (book.stock < 1) {
      throw new BookOutOfStockException(bookId);
    }

    await this.bookService.decreaseBookStock(bookId);

    return await this.borrowBookRepository.insertIntoDB(payload);
  }

  async return(payload: BorrowBookDto): Promise<void> {
    const { bookId, memberId } = payload;

    const member = await this.memberService.findOneById(memberId);

    if (!member) {
      throw new MemberNotFoundException(memberId);
    }

    const borrowedBook =
      await this.borrowBookRepository.findUserBorrowedBookByBookId(
        memberId,
        bookId,
      );

    if (!borrowedBook) {
      throw new BookNotBorrowedException(bookId);
    }

    await this.borrowBookRepository.returnBorrowedBook(borrowedBook.id);
    await this.bookService.increaseBookStock(bookId);

    const today = new Date();
    const borrowedAt = borrowedBook.borrowedAt;
    const daysDiff = differenceInDays(today, borrowedAt);

    if (daysDiff > 7) {
      await this.memberService.givePenalty(memberId);
    }
  }
}
