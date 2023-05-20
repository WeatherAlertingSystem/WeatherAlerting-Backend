import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WeatherTrigger } from 'src/weather-trigger/schema/weather-trigger.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schema/user.schema';

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

  async findOne(username: string): Promise<User> {
    return this.userModel.findOne({ username: `${username}` }).exec();
  }

  async getIdByUserName(username: string): Promise<string> {
    const user = this.userModel.findOne({ username: `${username}` }).exec();
    return (await user)._id.toString();
  }

  async addSubscriptionToUser(
    subscriptionID: WeatherTrigger,
    userName: string,
  ): Promise<void> {
    const userID = await this.getIdByUserName(userName);
    const myUser = await this.userModel.findById(userID).exec();
    myUser.subscriptions.push(subscriptionID);
    myUser.save();
  }
}
