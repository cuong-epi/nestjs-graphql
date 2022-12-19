import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Film } from 'src/films/entities/film.entity';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { OneToMany } from 'typeorm/decorator/relations/OneToMany';

@Entity()
@ObjectType()
export class Director extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field(() => Int)
  gender: number;

  @Column()
  @Field(() => Int)
  yearOfBirth: number;

  @OneToMany(() => Film, film => film.director)
  films: Film[];
}
