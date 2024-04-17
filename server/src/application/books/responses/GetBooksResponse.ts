import { ApiProperty } from '@nestjs/swagger';
import { Book } from '../../../domain/books/entities/books.entity';

export class GetBooksResponse {
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

  @ApiProperty({
    description: 'Array of books',
    type: Book,
    isArray: true,
  })
  data: Book[];
}
