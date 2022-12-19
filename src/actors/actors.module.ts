import { Module } from '@nestjs/common';
import { ActorsService } from './actors.service';
import { ActorsResolver } from './actors.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Actor } from './entities/actor.entity';
import { FilmsService } from 'src/films/films.service';
import { Category } from 'src/categories/entities/category.entity';
import { Director } from 'src/directors/entities/director.entity';
import { Film } from 'src/films/entities/film.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Film, Actor, Category, Director])],
  exports: [TypeOrmModule],
  providers: [ActorsResolver, ActorsService, FilmsService]
})
export class ActorsModule {}
