import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class BookNotFoundExceptionResponse {
  @ApiProperty({
    description: 'HTTP Code',
    example: '404',
  })
  code: number;

  @ApiProperty({
    description: 'Message',
    example: 'Book with id 1 not found',
  })
  message: string;
}

export class BookOutOfStockExceptionResponse {
  @ApiProperty({
    description: 'HTTP Code',
    example: '422',
  })
  code: number;

  @ApiProperty({
    description: 'Message',
    example: 'Book with id 1 out of stock',
  })
  message: string;
}

export class MemberNotFoundExceptionResponse {
  @ApiProperty({
    description: 'HTTP Code',
    example: '404',
  })
  code: number;

  @ApiProperty({
    description: 'Message',
    example: 'Member with id 1 not found',
  })
  message: string;
}

export class MemberPenalizedExceptionResponse {
  @ApiProperty({
    description: 'HTTP Code',
    example: '400',
  })
  code: number;

  @ApiProperty({
    description: 'Message',
    example: 'Member with ID 1 is penalized until April 20 2024.',
  })
  message: string;
}

export class BorrowedBookQtyExceededExceptionResponse {
  @ApiProperty({
    description: 'HTTP Code',
    example: '400',
  })
  code: number;

  @ApiProperty({
    description: 'Message',
    example: 'Maximum allowed quantity of borrowed books exceeded',
  })
  message: string;
}

export class BookNotFoundException extends HttpException {
  constructor(id: number) {
    super(`Book with ID ${id} not found`, HttpStatus.NOT_FOUND);
    this.name = 'BookNotFoundException';
  }
}

export class BookOutOfStockException extends HttpException {
  constructor(id: number) {
    super(`Book with ID ${id} out of stock`, HttpStatus.UNPROCESSABLE_ENTITY);
    this.name = 'BookOutOfStockException';
  }
}

export class MemberNotFoundException extends HttpException {
  constructor(id: number) {
    super(`Member with ID ${id} not found`, HttpStatus.NOT_FOUND);
    this.name = 'MemberNotFoundException';
  }
}

export class BorrowedBookQtyExceededException extends HttpException {
  constructor() {
    super(
      `Maximum allowed quantity of borrowed books exceeded`,
      HttpStatus.BAD_REQUEST,
    );
    this.name = 'BorrowedBookQtyExceededException';
  }
}

export class MemberPenalizedException extends HttpException {
  constructor(id: number, until: string) {
    super(
      `Member with ID ${id} is penalized until ${until}.`,
      HttpStatus.BAD_REQUEST,
    );
    this.name = 'MemberPenalizedException';
  }
}
