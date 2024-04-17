import { MigrationInterface, QueryRunner } from 'typeorm';
import { booksSeed } from './seeds/books.seed';
import { Book } from '../../src/domain/books/entities/books.entity';

export class SeedBooks1713257699139 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    for (const book of booksSeed) {
      const entity = await queryRunner.manager.create<Book>(Book, {
        code: book.code,
        title: book.title,
        author: book.author,
        stock: book.stock,
      });

      await queryRunner.manager.save(entity);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const books = await queryRunner.manager.find(Book);

    for (const book of books) {
      await queryRunner.manager.delete(Book, book.id);
    }
  }
}
