import { CreateDirectorInput } from './create-director.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateDirectorInput extends PartialType(CreateDirectorInput) {
  @Field(() => Int, { nullable: true })
  id: number;
}
