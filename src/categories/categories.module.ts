import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesResolver } from './categories.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { FilmsService } from 'src/films/films.service';
import { Actor } from 'src/actors/entities/actor.entity';
import { Director } from 'src/directors/entities/director.entity';
import { Film } from 'src/films/entities/film.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Film, Actor, Category, Director])],
  exports: [TypeOrmModule],
  providers: [CategoriesResolver, CategoriesService, FilmsService]
})
export class CategoriesModule {}
