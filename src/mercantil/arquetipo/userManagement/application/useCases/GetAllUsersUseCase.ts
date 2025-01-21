import { UserService } from '@userManagement/domain/services/UserService';
import { PaginationRequestDto } from '@crosscutting/dto/request/PaginationRequestDto';
import { PaginationResponseDto } from '@crosscutting/dto/response/PaginationResponseDto';

export class GetAllUsersUseCase {
  constructor(private userService: UserService) {}

  /**
   *
   *
   * @param {PaginationRequestDto} paginationDto
   * @return {*}  {Promise<{ data: PaginationResponseDto<any>; message: string }>}
   * @memberof GetAllUsersUseCase
   */
  async execute(paginationDto: PaginationRequestDto): Promise<PaginationResponseDto<any>> {
    const { page, limit } = paginationDto;
    const offset = (page - 1) * limit;
    const users = await this.userService.findAll({ offset, limit });
    const totalItems = await this.userService.count();
    return new PaginationResponseDto(users, page, totalItems, limit);
    };
}

