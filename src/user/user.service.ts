import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    // TODO: Hash the password
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  // async addSubscriptionToUser(
  //   subscriptionID: number,
  //   userID: string,
  // ): Promise<void> {
  //   const myUser = await this.userModel.findById(userID).exec();
  //   myUser.subscriptions.push(subscriptionID);
  // }
}
