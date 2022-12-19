import { Test, TestingModule } from '@nestjs/testing';
import { DirectorsResolver } from './directors.resolver';
import { DirectorsService } from './directors.service';

describe('DirectorsResolver', () => {
  let resolver: DirectorsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DirectorsResolver, DirectorsService],
    }).compile();

    resolver = module.get<DirectorsResolver>(DirectorsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
