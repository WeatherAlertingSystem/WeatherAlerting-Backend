import { Test, TestingModule } from '@nestjs/testing';
import { UserWeatherTriggerController } from './user-weather-trigger.controller';

describe('UserWeatherTriggerController', () => {
  let controller: UserWeatherTriggerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserWeatherTriggerController],
    }).compile();

    controller = module.get<UserWeatherTriggerController>(
      UserWeatherTriggerController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
