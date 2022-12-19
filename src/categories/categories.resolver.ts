import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { CategoriesService } from './categories.service';
import { Category } from './entities/category.entity';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { SearchCategoryArgs } from './dto/search-category.args';
import { FilmsService } from 'src/films/films.service';
import { SearchFirmArgs } from 'src/films/dto/search-firm.args';
import { Film } from 'src/films/entities/film.entity';
import { RemoveCategoryInput } from './dto/remove-category.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Resolver(() => Category)
export class CategoriesResolver {
  constructor(
     private readonly categoriesService: CategoriesService,
     private readonly filmsService: FilmsService) {}

  @Mutation(() => Category)
  @UseGuards(JwtAuthGuard)
  async createCategory(@Args('createCategoryInput') createCategoryInput: CreateCategoryInput) {
    return this.categoriesService.create(createCategoryInput);
  }

  @Mutation(() => Category)
  @UseGuards(JwtAuthGuard)
  async updateCategory(@Args('updateCategoryInput') updateCategoryInput: UpdateCategoryInput) {
    return this.categoriesService.update(updateCategoryInput);
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
  async removeCategory(@Args('removeCategoryInputs', { type: () => [RemoveCategoryInput]}) removeCategoryInputs: RemoveCategoryInput[]) {
    return this.categoriesService.remove(removeCategoryInputs);
  }

  @Query(() => [Category], { name: 'categories' })
  @UseGuards(JwtAuthGuard)
  async findAll(@Args() args: SearchCategoryArgs) {
    return this.categoriesService.findAll(args);
  }
  
  @Query(() => Category, { name: 'category' })
  @UseGuards(JwtAuthGuard)
  async findOneById(@Args('id', { type: () => Int }) id: number) {
    return this.categoriesService.findOneById(id);
  }

  @ResolveField('films', returns => [Film])
  @UseGuards(JwtAuthGuard)
  async getFilms(@Parent() category: Category, @Args() args:  SearchFirmArgs) {
    args.categoryId = category.id;
    return this.filmsService.findAll(args);
  }
}
