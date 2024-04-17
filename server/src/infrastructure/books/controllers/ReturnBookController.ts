import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { SUCCESS } from '../../../common/constants/response.constant';
import { Result } from '../../../common/helpers/result.helper';
import { Book } from '../../../domain/books/entities/books.entity';
import { BorrowBookResponse } from '../../../application/books/responses/BorrowBookResponse';
import { IBorrowBookService } from '../../../domain/books/interfaces/IBorrowBookService';
import { BorrowBookDto } from '../../../application/books/dtos/BorrowBookDto';
import { BookNotBorrowedExceptionResponse } from 'src/application/books/exceptions/ReturnBookException';

@ApiTags('Books')
@Controller()
export class ReturnBookController {
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
    description: 'Returned when no book found in borrowed list',
    type: BookNotBorrowedExceptionResponse,
  })
  @Post('/return')
  async borrowBook(
    @Body() payload: BorrowBookDto,
  ): Promise<BorrowBookResponse> {
    await this.borrowBookService.return(payload);

    return new Result<Book[]>().success(HttpStatus.OK, SUCCESS);
  }
}
