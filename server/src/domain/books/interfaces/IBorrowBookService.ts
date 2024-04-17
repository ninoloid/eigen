import { BorrowBookDto } from '../../../application/books/dtos/BorrowBookDto';
import { BorrowedBook } from '../entities/borrowedBooks.entity';

export interface IBorrowBookService {
  borrow(payload: BorrowBookDto): Promise<BorrowedBook>;
  return(payload: BorrowBookDto): Promise<void>;
}

export const IBorrowBookService = Symbol('IBorrowBookService');
