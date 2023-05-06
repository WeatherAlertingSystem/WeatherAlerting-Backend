import { Controller, Get } from '@nestjs/common';
import { Admin } from './schema/admin.schema';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}
  @Get()
  async findAll(): Promise<Admin[]> {
    return this.adminService.findAll();
  }
}
