import { BorrowedBook } from '../../../domain/books/entities/borrowedBooks.entity';
import { Member } from '../entities/members.entity';

export type FindAllResult = Member & {
  borrowedBooksCount?: number;
  borrowedBooks?: BorrowedBook[];
};

export interface IMemberService {
  findAll(): Promise<FindAllResult[]>;
  findOneById(id: number): Promise<Member | null>;
  givePenalty(id: number): Promise<void>;
  removePenalty(id: number): Promise<void>;
}

export const IMemberService = Symbol('IMemberService');
