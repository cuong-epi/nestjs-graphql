import { Test, TestingModule } from '@nestjs/testing';
import { ActorsResolver } from './actors.resolver';
import { ActorsService } from './actors.service';

describe('ActorsResolver', () => {
  let resolver: ActorsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ActorsResolver, ActorsService],
    }).compile();

    resolver = module.get<ActorsResolver>(ActorsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
