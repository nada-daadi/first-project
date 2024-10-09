import { Test, TestingModule } from '@nestjs/testing';
import { OderController } from './oder.controller';
import { OderService } from './oder.service';

describe('OderController', () => {
  let controller: OderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OderController],
      providers: [OderService],
    }).compile();

    controller = module.get<OderController>(OderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
