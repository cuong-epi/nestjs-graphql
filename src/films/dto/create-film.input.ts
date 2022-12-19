import { InputType, Int, Field } from '@nestjs/graphql';
import { UpdateActorInput } from 'src/actors/dto/update-actor.input';
import { UpdateCategoryInput } from 'src/categories/dto/update-category.input';
import { UpdateDirectorInput } from 'src/directors/dto/update-director.input';

@InputType()
export class CreateFilmInput  {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => Int)
  publishedYear: number;

  @Field(() => [UpdateActorInput], { nullable: true })
  actors: UpdateActorInput[] = [];

  @Field(() => [UpdateCategoryInput], { nullable: true })
  categories: UpdateCategoryInput[] = [];

  @Field(() => UpdateDirectorInput, { nullable: true })
  director: UpdateDirectorInput;
}
