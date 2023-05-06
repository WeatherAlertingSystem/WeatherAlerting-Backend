import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WeatherTrigger } from 'src/weather-trigger/schema/weather-trigger.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    // TODO: Hash the password
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async addSubscriptionToUser(
    subscriptionID: WeatherTrigger,
    userID: string, //TODO: In future we should detect user in a better way than string with ID!
  ): Promise<void> {
    const myUser = await this.userModel.findById(userID).exec();
    myUser.subscriptions.push(subscriptionID);
    myUser.save();
  }
}
