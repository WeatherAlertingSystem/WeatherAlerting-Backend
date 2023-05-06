import { Test, TestingModule } from '@nestjs/testing';
import { WeatherEngineService } from './weather-engine.service';

describe('WeatherEngineService', () => {
  let service: WeatherEngineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WeatherEngineService],
    }).compile();

    service = module.get<WeatherEngineService>(WeatherEngineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
