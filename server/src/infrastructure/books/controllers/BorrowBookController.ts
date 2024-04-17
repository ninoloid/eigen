import { Body, Controller, HttpStatus, Inject, Post } from '@nestjs/common';
import {
  ApiTags,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiUnprocessableEntityResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { SUCCESS } from '../../../common/constants/response.constant';
import { Result } from '../../../common/helpers/result.helper';
import { Book } from '../../../domain/books/entities/books.entity';
import { BorrowBookResponse } from '../../../application/books/responses/BorrowBookResponse';
import { IBorrowBookService } from '../../../domain/books/interfaces/IBorrowBookService';
import { BorrowBookDto } from '../../../application/books/dtos/BorrowBookDto';
import {
  BookNotFoundExceptionResponse,
  BookOutOfStockExceptionResponse,
  BorrowedBookQtyExceededExceptionResponse,
} from '../../../application/books/exceptions/BorrowBookException';

@ApiTags('Books')
@Controller()
export class BorrowBookController {
  constructor(
    @Inject(IBorrowBookService)
    private readonly borrowBookService: IBorrowBookService,
  ) {}

  @ApiOkResponse({
    status: 200,
    description: 'The resources were returned successfully',
    type: BorrowBookResponse,
  })
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Returned when no book found',
    type: BookNotFoundExceptionResponse,
  })
  @ApiUnprocessableEntityResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: 'Returned when the book is out of stock',
    type: BookOutOfStockExceptionResponse,
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Returned when the user already borrow 2 books',
    type: BorrowedBookQtyExceededExceptionResponse,
  })
  @Post('/borrow')
  async borrowBook(
    @Body() payload: BorrowBookDto,
  ): Promise<BorrowBookResponse> {
    await this.borrowBookService.borrow(payload);

    return new Result<Book[]>().success(HttpStatus.OK, SUCCESS);
  }
}
