import { Test, TestingModule } from '@nestjs/testing';
import { WeatherTriggerService } from './weather-trigger.service';

describe('WeatherTriggerService', () => {
  let service: WeatherTriggerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WeatherTriggerService],
    }).compile();

    service = module.get<WeatherTriggerService>(WeatherTriggerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
