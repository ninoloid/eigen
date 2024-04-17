import { ApiProperty } from '@nestjs/swagger';
import { Book } from '../../../domain/books/entities/books.entity';

export class BorrowBookResponse {
  @ApiProperty({
    description: 'HTTP Code',
    example: '200',
  })
  code: number;

  @ApiProperty({
    description: 'Message',
    example: 'Success',
  })
  message: string;
}
