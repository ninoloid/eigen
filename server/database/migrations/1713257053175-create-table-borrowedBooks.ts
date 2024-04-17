import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableBorrowedBooks1713257053175
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'borrowedBooks',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'bookId',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'memberId',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'qty',
            type: 'int',
            isNullable: false,
            default: 1,
          },
          {
            name: 'borrowedAt',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'status',
            type: 'enum',
            enum: ['BORROWED', 'RETURNED'],
            default: "'BORROWED'",
            isNullable: false,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'now()',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('dbBoilerplate');
  }
}
