import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { SanitizeMongooseModelInterceptor } from 'nestjs-mongoose-exclude';
import { Public } from '../../src/auth/auth.guard';
import { AuthService } from '../../src/auth/auth.service';
import { Roles } from '../../src/auth/decorators/roles.decorator';
import { RolesGuard } from '../../src/auth/guards/roles.guard';
import { Role } from '../../src/auth/models/role.enum';
import { SignInDto } from '../auth/dto/sign-in.dto';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { Admin } from './schema/admin.schema';

@UseInterceptors(
  new SanitizeMongooseModelInterceptor({
    excludeMongooseId: false,
    excludeMongooseV: true,
  }),
)
@Controller('admin')
export class AdminController {
  constructor(
    private adminService: AdminService,
    private authService: AuthService,
  ) {}

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Post()
  async create(@Body() createAdminDto: CreateAdminDto): Promise<Admin> {
    return this.adminService.create(createAdminDto);
  }

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Get()
  async findAll(): Promise<Admin[]> {
    return this.adminService.findAll();
  }

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Admin> {
    return this.adminService.findOne(id);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('auth')
  adminSignIn(@Body() signInDto: SignInDto) {
    return this.authService.adminSignIn(signInDto.username, signInDto.password);
  }
}
