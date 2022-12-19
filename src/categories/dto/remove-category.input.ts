import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class RemoveCategoryInput {
  @Field(() => Int!)
  id: number;

  @Field(() => [Int], { nullable: true })
  films: number[] = [];
}
