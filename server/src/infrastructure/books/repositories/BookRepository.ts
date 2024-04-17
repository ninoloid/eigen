import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { IBookRepository } from 'src/domain/books/repositories/IBookRepository';
import { Book } from '../../../domain/books/entities/books.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual } from 'typeorm';

@Injectable()
export class BookRepository implements IBookRepository {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  async find(): Promise<Book[]> {
    return await this.bookRepository.find();
  }

  async getAvailableBooks(): Promise<Book[]> {
    return await this.bookRepository.find({
      where: {
        stock: MoreThanOrEqual(1),
      },
    });
  }

  async findOneById(id: number): Promise<Book | null> {
    return await this.bookRepository.findOneBy({ id });
  }

  async decreaseBookStock(id: number): Promise<void> {
    const book = await this.bookRepository.findOneBy({ id });
    if (book) {
      book.stock--;
      await this.bookRepository.save(book);
    }
  }

  async increaseBookStock(id: number): Promise<void> {
    const book = await this.bookRepository.findOneBy({ id });
    if (book) {
      book.stock++;
      await this.bookRepository.save(book);
    }
  }
}
