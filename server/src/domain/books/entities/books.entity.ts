import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('books')
export class Book {
  @ApiProperty({ description: 'Primary key as ID', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: "Book's Code",
    example: 'M001',
  })
  @Column('varchar', { nullable: false })
  code: string;

  @ApiProperty({
    description: "Book's Title",
    example: 'Harry Potter',
  })
  @Column('varchar', { nullable: false })
  title: string;

  @ApiProperty({
    description: "Book's Author",
    example: 'Harry Potter',
  })
  @Column('varchar', { nullable: false })
  author: string;

  @ApiProperty({
    description: "Book's Stock",
    example: 1,
  })
  @Column('int', { nullable: false, default: 1 })
  stock: number;

  @ApiProperty({
    description: 'Created at',
    example: new Date(),
  })
  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @ApiProperty({
    description: 'Updated at',
    example: new Date(),
  })
  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt?: Date;
}
