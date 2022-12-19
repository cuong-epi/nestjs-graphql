import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateDirectorInput {
  @Field({nullable: true})
  name: string;

  @Field(() => Int!)
  gender: number;

  @Field(() => Int!)
  yearOfBirth: number;
}
