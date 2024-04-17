import { ApiProperty } from '@nestjs/swagger';
import { Member } from '../../../domain/members/entities/members.entity';

export class GetMembersResponse {
  @ApiProperty({
    description: 'HTTP Code',
    example: '200',
  })
  code: number;

  @ApiProperty({
    description: 'Message',
    example: 'Success',
  })
  message: string;

  @ApiProperty({
    description: 'Array of members',
    type: Member,
    isArray: true,
  })
  data: Member[];
}
