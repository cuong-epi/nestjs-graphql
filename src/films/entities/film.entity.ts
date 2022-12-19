import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Actor } from 'src/actors/entities/actor.entity';
import { Category } from 'src/categories/entities/category.entity';
import { Director } from 'src/directors/entities/director.entity';
import { BaseEntity, Column, Entity, JoinTable, PrimaryGeneratedColumn } from 'typeorm';
import { ManyToMany } from 'typeorm/decorator/relations/ManyToMany';
import { ManyToOne } from 'typeorm/decorator/relations/ManyToOne';

@Entity()
@ObjectType()
export class Film extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  description: string;

  @Column()
  @Field(() => Int)
  publishedYear: number;

  @ManyToMany(() => Actor, actor => actor.films)
  @JoinTable()
  actors: Actor[];

  @ManyToMany(() => Category, category => category.films)
  @JoinTable()
  categories: Category[];

  @ManyToOne(() => Director, (director) => director.films, {onDelete: "SET NULL"})
  director: Director;
}
