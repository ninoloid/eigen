import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class BookNotBorrowedExceptionResponse {
  @ApiProperty({
    description: 'HTTP Code',
    example: '404',
  })
  code: number;

  @ApiProperty({
    description: 'Message',
    example: 'Book with ID 1 not found in your borrowed book list',
  })
  message: string;
}

export class BookNotBorrowedException extends HttpException {
  constructor(id: number) {
    super(
      `Book with ID ${id} not found in your borrowed book list`,
      HttpStatus.NOT_FOUND,
    );
    this.name = 'BookNotBorrowedException';
  }
}
