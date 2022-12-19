import { Field, Int, ArgsType } from '@nestjs/graphql';
import { PaginationArgs } from 'src/common/args/pagination.args';

@ArgsType()
export class SearchFirmArgs extends PaginationArgs {
  @Field(() => Int)
  id: number = 0;

  @Field()
  name: string = "";

  @Field()
  description: string = "";

  @Field(() => Int)
  actorId: number = 0;

  @Field(() => Int)
  categoryId: number = 0;

  @Field(() => Int)
  directorId: number = 0;
}
