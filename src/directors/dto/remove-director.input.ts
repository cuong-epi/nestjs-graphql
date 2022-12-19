import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class RemoveDirectorInput {
  @Field(() => Int!)
  id: number;

  @Field(() => [Int], { nullable: true })
  films: number[] = [];
}
