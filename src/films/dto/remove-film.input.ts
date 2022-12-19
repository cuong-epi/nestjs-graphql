import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class RemoveFilmInput {
  @Field(() => Int!)
  id: number;

  @Field(() => [Int], { nullable: true })
  actors: number[] = [];

  @Field(() => [Int], { nullable: true })
  categories: number[] = [];

  @Field(() => Int, { nullable: true })
  director: number;
}
