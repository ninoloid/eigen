import { Controller, Get, HttpStatus, Inject } from '@nestjs/common';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { SUCCESS } from '../../../common/constants/response.constant';
import { Result } from '../../../common/helpers/result.helper';
import { IMemberService } from '../../../domain/members/interfaces/IMemberService';
import { Member } from '../../../domain/members/entities/members.entity';
import { GetMembersResponse } from '../../../application/members/responses/GetMembersResponse';

@ApiTags('Members')
@Controller()
export class GetMembersController {
  constructor(
    @Inject(IMemberService)
    private readonly memberService: IMemberService,
  ) {}

  @ApiOkResponse({
    status: 200,
    description: 'The resources were returned successfully',
    type: GetMembersResponse,
  })
  @Get('/')
  async getMembers(): Promise<GetMembersResponse> {
    const result = await this.memberService.findAll();

    return new Result<Member[]>().success(HttpStatus.OK, SUCCESS, result);
  }
}
