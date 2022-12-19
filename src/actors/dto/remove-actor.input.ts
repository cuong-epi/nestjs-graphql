import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class RemoveActorInput {
  @Field(() => Int!)
  id: number;

  @Field(() => [Int], { nullable: true })
  films: number[] = [];
}
