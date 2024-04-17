import { Book } from '../entities/books.entity';

export interface IBookService {
  findAll(): Promise<Book[]>;
  getAvailableBooks(): Promise<Book[]>;
  findOneById(id: number): Promise<Book | null>;
  decreaseBookStock(id: number): Promise<void>;
  increaseBookStock(id: number): Promise<void>;
}

export const IBookService = Symbol('IBookService');
