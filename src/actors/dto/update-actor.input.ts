import { CreateActorInput } from './create-actor.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateActorInput extends PartialType(CreateActorInput) {
  @Field(() => Int, { nullable: true })
  id: number;
}
