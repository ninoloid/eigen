import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IMemberRepository } from '../../../domain/members/repositories/IMemberRepository';
import { MemberRepository } from '../repositories/MemberRepository';
import { IMemberService } from '../../../domain/members/interfaces/IMemberService';
import { MemberService } from '../../../application/members/MemberService';
import { GetMembersController } from '../controllers/GetMembersController';
import { Member } from '../../../domain/members/entities/members.entity';
import { IBorrowedBookRepository } from '../../../domain/books/repositories/IBorrowedBookRepository';
import { BorrowedBookRepository } from '../../../infrastructure/books/repositories/BorrowedBookRepository';
import { BorrowedBook } from '../../../domain/books/entities/borrowedBooks.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Member, BorrowedBook])],
  controllers: [GetMembersController],
  providers: [
    {
      provide: IMemberRepository,
      useClass: MemberRepository,
    },
    {
      provide: IBorrowedBookRepository,
      useClass: BorrowedBookRepository,
    },
    {
      provide: IMemberService,
      useClass: MemberService,
    },
  ],
})
export class MembersModule {}
