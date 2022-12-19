import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { ActorsService } from './actors.service';
import { Actor } from './entities/actor.entity';
import { CreateActorInput } from './dto/create-actor.input';
import { UpdateActorInput } from './dto/update-actor.input';
import { SearchActorArgs } from './dto/search-actor.args';
import { SearchFirmArgs } from 'src/films/dto/search-firm.args';
import { FilmsService } from 'src/films/films.service';
import { Film } from 'src/films/entities/film.entity';
import { RemoveActorInput } from './dto/remove-actor.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Resolver(() => Actor)
export class ActorsResolver {
  constructor(
    private readonly actorsService: ActorsService,
    private readonly filmsService: FilmsService) {}

  @Mutation(() => Actor)
  @UseGuards(JwtAuthGuard)
  async createActor(@Args('createActorInput') createActorInput: CreateActorInput) {
    return this.actorsService.create(createActorInput);
  }

  @Mutation(() => Actor)
  @UseGuards(JwtAuthGuard)
  async updateActor(@Args('updateActorInput') updateActorInput: UpdateActorInput) {
    return this.actorsService.update(updateActorInput);
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
  async removeActor(@Args('removeActorInputs', { type: () => [RemoveActorInput] }) removeActorInputs: RemoveActorInput[]) {
    return this.actorsService.remove(removeActorInputs);
  }

  @Query(() => [Actor], { name: 'actors' })
  @UseGuards(JwtAuthGuard)
  async findAll(@Args() args: SearchActorArgs) {
    return this.actorsService.findAll(args);
  }

  @Query(() => Actor, { name: 'actor' })
  @UseGuards(JwtAuthGuard)
  async findOneById(@Args('id', { type: () => Int }) id: number) {
    return this.actorsService.findOneById(id);
  }

  @ResolveField('films', returns => [Film])
  @UseGuards(JwtAuthGuard)
  async getFilms(@Parent() actor: Actor, @Args() args:  SearchFirmArgs) {
    args.actorId = actor.id;
    return this.filmsService.findAll(args);
  }
}
