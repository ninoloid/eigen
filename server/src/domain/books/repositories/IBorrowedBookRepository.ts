import { BorrowBookDto } from '../../../application/books/dtos/BorrowBookDto';
import { BorrowedBook } from '../entities/borrowedBooks.entity';

export interface IBorrowedBookRepository {
  insertIntoDB(payload: BorrowBookDto): Promise<BorrowedBook>;
  findUserBorrowedBooks(memberId: number): Promise<BorrowedBook[]>;
  findUserBorrowedBookByBookId(
    memberId: number,
    bookId: number,
  ): Promise<BorrowedBook | null>;
  returnBorrowedBook(id: number): Promise<void>;
}

export const IBorrowedBookRepository = Symbol('IBorrowedBookRepository');
