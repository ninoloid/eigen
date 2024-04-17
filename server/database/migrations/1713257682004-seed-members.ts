import { MigrationInterface, QueryRunner } from 'typeorm';
import { membersSeed } from './seeds/members.seed';
import { Member } from '../../src/domain/members/entities/members.entity';

export class SeedMembers1713257682004 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    for (const member of membersSeed) {
      const entity = await queryRunner.manager.create<Member>(Member, {
        code: member.code,
        name: member.name,
        isPenalized: member.isPenalized,
      });

      await queryRunner.manager.save(entity);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const members = await queryRunner.manager.find(Member);

    for (const member of members) {
      await queryRunner.manager.delete(Member, member.id);
    }
  }
}
