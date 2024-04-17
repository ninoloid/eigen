import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('members')
export class Member {
  @ApiProperty({ description: 'Primary key as ID', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: "Member's Code",
    example: 'M001',
  })
  @Column('varchar', { nullable: false })
  code: string;

  @ApiProperty({
    description: "Member's Name",
    example: 'Angga',
  })
  @Column('varchar', { nullable: false })
  name: string;

  @ApiProperty({
    description: 'Flag to determine whether the member is penalized',
    example: false,
  })
  @Column('boolean', { nullable: false, default: false })
  isPenalized: boolean;

  @ApiProperty({
    description: 'The date study was ended',
    example: new Date(),
  })
  @Column({ type: 'timestamp', nullable: true })
  penalizedUntil?: Date;

  @ApiProperty({
    description: 'Created at',
    example: new Date(),
  })
  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @ApiProperty({
    description: 'Updated at',
    example: new Date(),
  })
  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt?: Date;
}
