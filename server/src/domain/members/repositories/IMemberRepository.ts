import { Member } from '../entities/members.entity';

export interface IMemberRepository {
  find(): Promise<Member[]>;
  findOneById(id: number): Promise<Member | null>;
  givePenalty(id: number): Promise<void>;
  removePenalty(id: number): Promise<void>;
}

export const IMemberRepository = Symbol('IMemberRepository');
