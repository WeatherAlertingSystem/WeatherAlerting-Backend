import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { Public } from 'src/auth/auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { signInDto } from '../auth/dto/sign-in.dto';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { Admin } from './schema/admin.schema';
@Controller('admin')
export class AdminController {
  constructor(
    private adminService: AdminService,
    private authService: AuthService,
  ) {}

  @Post()
  async create(@Body() createAdminDto: CreateAdminDto): Promise<Admin> {
    // TODO: Hash the password
    return this.adminService.create(createAdminDto);
  }

  @Get()
  async findAll(): Promise<Admin[]> {
    return this.adminService.findAll();
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('auth')
  adminSignIn(@Body() signInDto: signInDto) {
    return this.authService.adminSignIn(signInDto.username, signInDto.password);
  }
}
