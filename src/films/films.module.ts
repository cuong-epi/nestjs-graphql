import { Module } from '@nestjs/common';
import { FilmsService } from './films.service';
import { FilmsResolver } from './films.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { ActorsService } from 'src/actors/actors.service';
import { CategoriesService } from 'src/categories/categories.service';
import { DirectorsService } from 'src/directors/directors.service';
import { Film } from './entities/film.entity';
import { Actor } from 'src/actors/entities/actor.entity';
import { Category } from 'src/categories/entities/category.entity';
import { Director } from 'src/directors/entities/director.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Film, Actor, Category, Director])],
  exports: [TypeOrmModule],
  providers: [
    FilmsResolver, 
    FilmsService, 
    CategoriesService, 
    ActorsService, 
    DirectorsService
  ]
})
export class FilmsModule {}
