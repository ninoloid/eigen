import { Controller, Get, HttpStatus, Inject } from '@nestjs/common';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { SUCCESS } from '../../../common/constants/response.constant';
import { Result } from '../../../common/helpers/result.helper';
import { IBookService } from '../../../domain/books/interfaces/IBookService';
import { Book } from '../../../domain/books/entities/books.entity';
import { GetBooksResponse } from '../../../application/books/responses/GetBooksResponse';

@ApiTags('Books')
@Controller()
export class GetBooksController {
  constructor(
    @Inject(IBookService)
    private readonly getBooksService: IBookService,
  ) {}

  @ApiOkResponse({
    status: 200,
    description: 'The resources were returned successfully',
    type: GetBooksResponse,
  })
  @Get('/')
  async getBooks(): Promise<GetBooksResponse> {
    const result = await this.getBooksService.getAvailableBooks();

    return new Result<Book[]>().success(HttpStatus.OK, SUCCESS, result);
  }
}
