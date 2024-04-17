import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { IMemberRepository } from 'src/domain/members/repositories/IMemberRepository';
import { Member } from '../../../domain/members/entities/members.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { addDays } from 'date-fns';

@Injectable()
export class MemberRepository implements IMemberRepository {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
  ) {}

  async find() {
    return await this.memberRepository.find();
  }

  async findOneById(id: number) {
    return await this.memberRepository.findOneBy({ id });
  }

  async givePenalty(id: number): Promise<void> {
    const updatePaylaod = {
      isPenalized: true,
      penalizedUntil: addDays(new Date(), 3),
    };

    await this.memberRepository.update({ id }, updatePaylaod);
  }

  async removePenalty(id: number) {
    const updatePaylaod = {
      isPenalized: false,
      penalizedUntil: null,
    };

    await this.memberRepository.update({ id }, updatePaylaod);
  }
}
