import { Field, Int, ArgsType } from '@nestjs/graphql';
import { PaginationArgs } from 'src/common/args/pagination.args';

@ArgsType()
export class SearchCategoryArgs extends PaginationArgs {
  @Field(() => Int)
  id: number = 0;

  @Field()
  name: string = "";

  @Field(() => Int)
  filmId: number = 0;
}
