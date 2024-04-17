import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class BorrowBookDto {
  @ApiProperty({
    description: 'Book ID',
    example: 1,
  })
  @IsNotEmpty()
  bookId: number;

  @ApiProperty({
    description: 'Member ID',
    example: 1,
  })
  @IsNotEmpty()
  memberId: number;
}
