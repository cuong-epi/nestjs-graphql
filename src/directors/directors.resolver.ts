import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { DirectorsService } from './directors.service';
import { Director } from './entities/director.entity';
import { CreateDirectorInput } from './dto/create-director.input';
import { UpdateDirectorInput } from './dto/update-director.input';
import { SearchDirectorArgs } from './dto/search-director.args';
import { SearchFirmArgs } from 'src/films/dto/search-firm.args';
import { FilmsService } from 'src/films/films.service';
import { Film } from 'src/films/entities/film.entity';
import { RemoveDirectorInput } from './dto/remove-director.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Resolver(() => Director)
export class DirectorsResolver {
  constructor(
    private readonly directorsService: DirectorsService,
    private readonly filmsService: FilmsService) {}

  @Mutation(() => Director)
  @UseGuards(JwtAuthGuard)
  async createDirector(@Args('createDirectorInput') createDirectorInput: CreateDirectorInput) {
    return this.directorsService.create(createDirectorInput);
  }

  @Mutation(() => Director)
  @UseGuards(JwtAuthGuard)
  async updateDirector(@Args('updateDirectorInput') updateDirectorInput: UpdateDirectorInput) {
    return this.directorsService.update(updateDirectorInput);
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
  async removeDirector(@Args('removeDirectorInput', { type: () => [RemoveDirectorInput]}) removeDirectorInputs: RemoveDirectorInput[]) {
    return this.directorsService.remove(removeDirectorInputs);
  }

  @Query(() => [Director], { name: 'directors' })
  @UseGuards(JwtAuthGuard)
  async findAll(@Args() args: SearchDirectorArgs) {
    return this.directorsService.findAll(args);
  }

  @Query(() => Director, { name: 'director' })
  @UseGuards(JwtAuthGuard)
  async findOneById(@Args('id', { type: () => Int }) id: number) {
    return this.directorsService.findOneById(id);
  }

  @ResolveField('films', returns => [Film])
  @UseGuards(JwtAuthGuard)
  async getFilms(@Parent() director: Director, @Args() args:  SearchFirmArgs) {
    args.directorId = director.id;
    return this.filmsService.findAll(args);
  }
}
