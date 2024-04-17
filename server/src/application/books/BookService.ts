import { Inject, Injectable } from '@nestjs/common';
import { Book } from '../../domain/books/entities/books.entity';
import { IBookService } from '../../domain/books/interfaces/IBookService';
import { IBookRepository } from '../../domain/books/repositories/IBookRepository';

@Injectable()
export class BookService implements IBookService {
  constructor(
    @Inject(IBookRepository)
    private readonly bookRepository: IBookRepository,
  ) {}

  async findAll(): Promise<Book[]> {
    return await this.bookRepository.find();
  }

  async getAvailableBooks(): Promise<Book[]> {
    return await this.bookRepository.getAvailableBooks();
  }

  async findOneById(id: number): Promise<Book | null> {
    return await this.bookRepository.findOneById(id);
  }

  async decreaseBookStock(id: number): Promise<void> {
    await this.bookRepository.decreaseBookStock(id);
  }

  async increaseBookStock(id: number): Promise<void> {
    await this.bookRepository.increaseBookStock(id);
  }
}
