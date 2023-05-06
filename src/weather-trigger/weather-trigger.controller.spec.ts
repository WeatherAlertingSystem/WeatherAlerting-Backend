import { Test, TestingModule } from '@nestjs/testing';
import { WeatherTriggerController } from './weather-trigger.controller';

describe('WeatherTriggerController', () => {
  let controller: WeatherTriggerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WeatherTriggerController],
    }).compile();

    controller = module.get<WeatherTriggerController>(WeatherTriggerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
