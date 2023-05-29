import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { CreateAdminDto } from './dto/create-admin.dto';
import { Admin } from './schema/admin.schema';
@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<Admin>,
    private config: ConfigService,
  ) {}
  async findAll(): Promise<Admin[]> {
    return this.adminModel.find().exec();
  }

  async findOne(username: string): Promise<Admin> {
    return this.adminModel.findOne({ username: `${username}` }).exec();
  }

  async create(createAdminDto: CreateAdminDto): Promise<Admin> {
    createAdminDto.password = await bcrypt.hash(
      createAdminDto.password,
      this.config.get('hashing.salt'),
    );
    const newAdmin = new this.adminModel(createAdminDto);
    return newAdmin.save();
  }
}
