import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { FilmsService } from './films.service';
import { Film } from './entities/film.entity';
import { CreateFilmInput } from './dto/create-film.input';
import { UpdateFilmInput } from './dto/update-film.input';
import { CategoriesService } from 'src/categories/categories.service';
import { ActorsService } from 'src/actors/actors.service';
import { DirectorsService } from 'src/directors/directors.service';
import { SearchFirmArgs } from './dto/search-firm.args';
import { SearchActorArgs } from 'src/actors/dto/search-actor.args';
import { SearchCategoryArgs } from 'src/categories/dto/search-category.args';
import { Category } from 'src/categories/entities/category.entity';
import { Director } from 'src/directors/entities/director.entity';
import { Actor } from 'src/actors/entities/actor.entity';
import { SearchDirectorArgs } from 'src/directors/dto/search-director.args';
import { RemoveFilmInput } from './dto/remove-film.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Resolver(() => Film)
export class FilmsResolver {
  constructor(
    private readonly filmsService: FilmsService,
    private readonly categoriesService: CategoriesService,
    private readonly actorsService: ActorsService,
    private readonly directorsService: DirectorsService) {}

  @Mutation(() => Film)
  @UseGuards(JwtAuthGuard)
  async createFilm(@Args('createFilmInput') createFilmInput: CreateFilmInput) {
    return this.filmsService.create(createFilmInput);
  }

  @Mutation(() => Film)
  @UseGuards(JwtAuthGuard)
  async updateFilm(@Args('updateFilmInput') updateFilmInput: UpdateFilmInput) {
    return this.filmsService.update(updateFilmInput);
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
  async removeFilm(@Args('removeFilmInput', { type: () => [RemoveFilmInput] }) args: RemoveFilmInput[]) {  
    return this.filmsService.remove(args);
  }

  @Query(() => [Film], { name: 'films' })
  @UseGuards(JwtAuthGuard)
  async findAll(@Args() args: SearchFirmArgs) {
    return this.filmsService.findAll(args);
  }

  @Query(() => Film, { name: 'film' })
  @UseGuards(JwtAuthGuard)
  async findOneById(@Args('id', { type: () => Int }) id: number) {
    return this.filmsService.findOneById(id);
  }

  @ResolveField('actors', () => [Actor])
  @UseGuards(JwtAuthGuard)
  async getActors(@Parent() film: Film, @Args() args:  SearchActorArgs) {
    args.filmId = film.id;
    return this.actorsService.findAll(args);
  }

  @ResolveField('categories', () => [Category])
  @UseGuards(JwtAuthGuard)
  async getCategories(@Parent() film: Film, @Args() args:  SearchCategoryArgs) {
    args.filmId = film.id;
    return this.categoriesService.findAll(args);
  }

  @ResolveField('directors', () => [Director])
  @UseGuards(JwtAuthGuard)
  async getDirector(@Parent() film: Film, @Args() args:  SearchDirectorArgs) {
    args.filmId = film.id;
    return this.directorsService.findAll(args);
  }
}
