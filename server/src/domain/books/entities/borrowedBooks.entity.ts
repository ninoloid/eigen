import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export type BorrowedBookStatus = 'BORROWED' | 'RETURNED';

@Entity('borrowedBooks')
export class BorrowedBook {
  @ApiProperty({ description: 'Primary key as ID', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: "Book's Id",
    example: 1,
  })
  @Column('int', { nullable: false })
  bookId: number;

  @ApiProperty({
    description: "Member's Id",
    example: 1,
  })
  @Column('int', { nullable: false })
  memberId: number;

  @ApiProperty({
    description: 'Borrowed Quantity',
    example: 1,
  })
  @Column('int', { nullable: false, default: 1 })
  qty: number;

  @ApiProperty({
    description: 'Created at',
    example: new Date(),
  })
  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @ApiProperty({
    description: 'Borrowed at',
    example: new Date(),
  })
  @CreateDateColumn({ name: 'borrowedAt' })
  borrowedAt: Date;

  @Column({
    type: 'enum',
    enum: ['BORROWED', 'RETURNED'],
    default: 'text',
    nullable: false,
  })
  status: BorrowedBookStatus;

  @ApiProperty({
    description: 'Updated at',
    example: new Date(),
  })
  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt?: Date;
}
