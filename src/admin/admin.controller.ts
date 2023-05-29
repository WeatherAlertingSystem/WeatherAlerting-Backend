import { Body, Controller, Get, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { Admin } from './schema/admin.schema';

@Controller('admin')
export class AdminController {
  constructor(
    private adminService: AdminService,
    private config: ConfigService,
  ) {}

  @Post()
  async create(@Body() createAdminDto: CreateAdminDto): Promise<Admin> {
    createAdminDto.password = await bcrypt.hash(
      createAdminDto.password,
      this.config.get('hashing.salt'),
    );
    return this.adminService.create(createAdminDto);
  }

  @Get()
  async findAll(): Promise<Admin[]> {
    return this.adminService.findAll();
  }
}
