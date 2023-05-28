import { Body, Controller, Get, Post } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { Admin } from './schema/admin.schema';
@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Post()
  async create(@Body() createAdminDto: CreateAdminDto): Promise<Admin> {
    // TODO: Hash the password
    return this.adminService.create(createAdminDto);
  }

  @Get()
  async findAll(): Promise<Admin[]> {
    return this.adminService.findAll();
  }
}
