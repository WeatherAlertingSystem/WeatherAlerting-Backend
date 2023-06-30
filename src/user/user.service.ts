import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model, ObjectId } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schema/user.schema';
@Injectable()
export class UserService {
  constructor(
    private config: ConfigService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    createUserDto.password = await bcrypt.hash(
      createUserDto.password,
      this.config.get('hashing.salt'),
    );
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  async delete(id: ObjectId): Promise<User> {
    return this.userModel.findOneAndDelete({ _id: id }).exec();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(username: string): Promise<User> {
    return this.userModel.findOne({ username: `${username}` }).exec();
  }

  async getIdByUserName(username: string): Promise<string> {
    const user = this.userModel.findOne({ username: `${username}` }).exec();
    return (await user)._id.toString();
  }

  // async addSubscriptionToUser(
  //   subscriptionID: Types.ObjectId,
  //   userName: string,
  // ): Promise<void> {
  //   const userID = await this.getIdByUserName(userName);
  //   const myUser = await this.userModel.findById(userID).exec();
  //   myUser.subscriptions.push(subscriptionID);
  //   myUser.save();
  // }

  // async removeSubscriptionFromUser(
  //   subscriptionID: Types.ObjectId,
  //   userName: string,
  // ): Promise<void> {
  //   const userID = await this.getIdByUserName(userName);
  //   this.userModel
  //     .findByIdAndUpdate(
  //       userID,
  //       {
  //         $pull: {
  //           subscriptions: subscriptionID,
  //         },
  //       },
  //       { safe: true },
  //     )
  //     .exec();
  // }
}
