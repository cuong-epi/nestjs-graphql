import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Film } from 'src/films/entities/film.entity';
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @ManyToMany(() => Film, (film) => film.categories)
  films: Film[];
}
