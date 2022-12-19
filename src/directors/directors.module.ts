import { Module } from '@nestjs/common';
import { DirectorsService } from './directors.service';
import { DirectorsResolver } from './directors.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Director } from './entities/director.entity';
import { FilmsService } from 'src/films/films.service';
import { Actor } from 'src/actors/entities/actor.entity';
import { Category } from 'src/categories/entities/category.entity';
import { Film } from 'src/films/entities/film.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Film, Actor, Category, Director])],
  exports: [TypeOrmModule],
  providers: [DirectorsResolver, DirectorsService, FilmsService]
})
export class DirectorsModule {}
