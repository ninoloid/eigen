import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IBorrowedBookRepository } from '../../../domain/books/repositories/IBorrowedBookRepository';
import { BorrowedBook } from 'src/domain/books/entities/borrowedBooks.entity';
import { BorrowBookDto } from 'src/application/books/dtos/BorrowBookDto';

@Injectable()
export class BorrowedBookRepository implements IBorrowedBookRepository {
  constructor(
    @InjectRepository(BorrowedBook)
    private readonly borrowedBookRepository: Repository<BorrowedBook>,
  ) {}

  async insertIntoDB(payload: BorrowBookDto): Promise<BorrowedBook> {
    const { bookId, memberId } = payload;
    const borrowedBook = this.borrowedBookRepository.create({
      bookId,
      memberId,
      qty: 1,
      status: 'BORROWED',
    });

    return await this.borrowedBookRepository.save(borrowedBook);
  }

  async findUserBorrowedBooks(memberId: number): Promise<BorrowedBook[]> {
    return await this.borrowedBookRepository.find({
      where: {
        memberId,
        status: 'BORROWED',
      },
    });
  }

  async findUserBorrowedBookByBookId(
    memberId: number,
    bookId: number,
  ): Promise<BorrowedBook | null> {
    return await this.borrowedBookRepository.findOne({
      where: {
        memberId,
        bookId,
        status: 'BORROWED',
      },
    });
  }

  async returnBorrowedBook(id: number): Promise<void> {
    await this.borrowedBookRepository.update(
      {
        id,
      },
      { status: 'RETURNED' },
    );
  }
}
