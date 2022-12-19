import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Film } from 'src/films/entities/film.entity';
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OneToMany } from 'typeorm/decorator/relations/OneToMany';

@Entity()
@ObjectType()
export class Actor extends BaseEntity {
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

  @ManyToMany(() => Film, (film) => film.actors)
  films: Film[];
}
