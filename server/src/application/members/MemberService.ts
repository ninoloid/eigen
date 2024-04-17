import { Inject, Injectable } from '@nestjs/common';
import { Member } from '../../domain/members/entities/members.entity';
import {
  FindAllResult,
  IMemberService,
} from '../../domain/members/interfaces/IMemberService';
import { IMemberRepository } from '../../domain/members/repositories/IMemberRepository';
import { IBorrowedBookRepository } from '../../domain/books/repositories/IBorrowedBookRepository';

@Injectable()
export class MemberService implements IMemberService {
  constructor(
    @Inject(IMemberRepository)
    private readonly memberRepository: IMemberRepository,

    @Inject(IBorrowedBookRepository)
    private readonly borrowBookRepository: IBorrowedBookRepository,
  ) {}

  async findAll(): Promise<FindAllResult[]> {
    const members = await this.memberRepository.find();
    const modifiedMembers = [];

    for (const member of members) {
      const borrowedBooks =
        await this.borrowBookRepository.findUserBorrowedBooks(member.id);

      modifiedMembers.push({
        ...member,
        borrowedBooksCount: borrowedBooks.length,
        borrowedBooks,
      });
    }

    return modifiedMembers;
  }

  async findOneById(id: number): Promise<Member | null> {
    return await this.memberRepository.findOneById(id);
  }

  async givePenalty(id: number): Promise<void> {
    return await this.memberRepository.givePenalty(id);
  }

  async removePenalty(id: number): Promise<void> {
    return await this.memberRepository.removePenalty(id);
  }
}
