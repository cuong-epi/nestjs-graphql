import { Int, Field, ArgsType } from '@nestjs/graphql';

@ArgsType()
export class PaginationArgs {
  @Field((type) => Int)
  skip: number = 0;

  @Field((type) => Int)
  limit: number = 10;
}