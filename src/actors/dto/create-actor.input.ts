import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateActorInput {
  @Field()
  name: string;

  @Field(() => Int!)
  gender: number;

  @Field(() => Int!)
  yearOfBirth: number;
}
