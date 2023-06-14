import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateWeatherTriggerDto } from './dto/create-weather-trigger.dto';
import { WeatherTrigger } from './schema/weather-trigger.schema';

@Injectable()
export class WeatherTriggerService {
  constructor(
    @InjectModel(WeatherTrigger.name)
    private weatherTriggerModel: Model<WeatherTrigger>,
  ) {}

  async findAll(): Promise<WeatherTrigger[]> {
    return this.weatherTriggerModel.find().exec();
  }

  async create(
    createWeatherTriggerDto: CreateWeatherTriggerDto,
  ): Promise<WeatherTrigger> {
    const newTrigger = new this.weatherTriggerModel(createWeatherTriggerDto);
    return newTrigger.save();
  }

  async remove(id: string): Promise<WeatherTrigger> {
    const deletedTrigger = await this.weatherTriggerModel
      .findByIdAndRemove(id)
      .exec();
    return deletedTrigger;
  }
}
