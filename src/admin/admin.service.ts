import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAdminDto } from './dto/create-admin.dto';
import { Admin } from './schema/admin.schema';
@Injectable()
export class AdminService {
  constructor(@InjectModel(Admin.name) private adminModel: Model<Admin>) {}
  async findAll(): Promise<Admin[]> {
    return this.adminModel.find().exec();
  }

  async findOne(username: string): Promise<Admin> {
    return this.adminModel.findOne({ username: `${username}` }).exec();
  }

  async create(createAdminDto: CreateAdminDto): Promise<Admin> {
    const newAdmin = new this.adminModel(createAdminDto);
    return newAdmin.save();
  }
}
