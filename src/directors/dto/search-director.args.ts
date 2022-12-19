import { Field, Int, ArgsType } from '@nestjs/graphql';
import { PaginationArgs } from 'src/common/args/pagination.args';

@ArgsType()
export class SearchDirectorArgs extends PaginationArgs {
  @Field(() => Int)
  id: number = 0;

  @Field()
  name: string = "";

  @Field(() => Int)
  gender: number = 0;

  @Field(() => Int)
  filmId: number = 0;
}
