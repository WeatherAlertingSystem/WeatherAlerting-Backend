import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { SanitizeMongooseModelInterceptor } from 'nestjs-mongoose-exclude';
import { Public } from '../../src/auth/auth.guard';
import { Roles } from '../../src/auth/decorators/roles.decorator';
import { RolesGuard } from '../../src/auth/guards/roles.guard';
import { Role } from '../../src/auth/models/role.enum';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schema/user.schema';
import { UserService } from './user.service';

@UseInterceptors(
  new SanitizeMongooseModelInterceptor({
    excludeMongooseId: false,
    excludeMongooseV: true,
  }),
)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Public()
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Roles(Role.USER)
  @UseGuards(RolesGuard)
  @Get('me')
  async findMe(@Req() request): Promise<User> {
    return this.userService.findOne(request.payload.username);
  }
}
