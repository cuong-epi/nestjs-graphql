import { Injectable } from '@nestjs/common';
import { Actor } from 'src/actors/entities/actor.entity';
import { Category } from 'src/categories/entities/category.entity';
import { Director } from 'src/directors/entities/director.entity';
import { CreateFilmInput } from './dto/create-film.input';
import { RemoveFilmInput } from './dto/remove-film.input';
import { SearchFirmArgs } from './dto/search-firm.args';
import { UpdateFilmInput } from './dto/update-film.input';
import { Film } from './entities/film.entity';

@Injectable()
export class FilmsService {

  findAll(args: SearchFirmArgs): Promise<Film[]> {
      let query = Film.createQueryBuilder("film")
                      .leftJoin('film.actors', "actor")
                      .leftJoin('film.categories', "category")
                      .leftJoin('film.director', "director")
                      .where("1=1")
      
      if(args.id != 0){
        query = query.andWhere("film.id = :id", {id: args.id});
      }

      if(args.name != ""){
        query = query.andWhere("LOWER(film.name) = LOWER(:name)", {name: args.name})
      }

      if(args.description != ""){
        query = query.andWhere("LOWER(film.description) = LOWER(:description)", {description: args.description})
      }
      
      if(args.actorId != 0){
        query = query.andWhere("actor.id = :actorId", {actorId: args.actorId})
      }

      if(args.categoryId != 0){
        query = query.andWhere("category.id = :categoryId", {categoryId: args.categoryId})
      }
      
      if(args.directorId != 0){
        query = query.andWhere("director.id = :directorId", {directorId: args.directorId})
      }
      
      return query.orderBy("film.name", "ASC")
                  .skip(args.skip)
                  .limit(args.limit)
                  .getMany();
  }

  findOneById(id: number): Promise<Film | null> {
    return Film.findOneBy({id});
  }

  async create(createFilmInput: CreateFilmInput): Promise<Film> {
    let updatedActors = [];
    let updatedCategories = [];

    const {name, description, publishedYear} = createFilmInput;

    let film = Film.create({name, description, publishedYear})
    await film.save();

    for (const actor of createFilmInput.actors) {
       if(actor.id == null){
         const {name, gender, yearOfBirth} = actor;
         const newActor = Actor.create({name, gender, yearOfBirth});
         await newActor.save();
         updatedActors.push(newActor);
       }else{
        const updatedActor = await Actor.findOneBy({id: actor.id});
        if(updatedActor){
          updatedActors.push(updatedActor);
        }
       }
    }

    if(updatedActors.length > 0) film.actors = updatedActors;

    for (const category of createFilmInput.categories) {
      if(category.id == null){
        const newCategory = Category.create({
          name: category.name,
        });
        await newCategory.save();
        updatedCategories.push(newCategory);
      }else{
        const updatedCategory = await Category.findOneBy({id: category.id});
        if(updatedCategory){
          updatedCategories.push(updatedCategory);
        }
      }
   }
   if(updatedCategories.length > 0) film.categories = updatedCategories;

    if(createFilmInput.director){
      if(createFilmInput.director.id == null){
        const {name, gender, yearOfBirth} = createFilmInput.director;
        const newDirector = Director.create({name, gender, yearOfBirth});
        film.director = await newDirector.save();
      }else{
        const director = await Director.findOneBy({id: createFilmInput.director.id});
        if(director){
          film.director = director;
        }
      }
    }

    return film.save();
  }

  async update(updateFilmInput: UpdateFilmInput): Promise<Film> {
    let updatedActors = [];
    let updatedCategories = [];

    let film = await Film.findOneBy({id: updateFilmInput.id});
    if(updateFilmInput.name != null) film.name = updateFilmInput.name;
    if(updateFilmInput.description != null) film.description = updateFilmInput.description;
    if(updateFilmInput.publishedYear != null) film.publishedYear = updateFilmInput.publishedYear;
  
    for (const actor of updateFilmInput.actors) {
      if(actor.id == null){
        const {name, gender, yearOfBirth} = actor;
        const newActor = Actor.create({name, gender, yearOfBirth});
        await newActor.save();
        updatedActors.push(newActor);
      }else{
       const updatedActor = await Actor.findOneBy({id: actor.id});
       if(updatedActor){
         updatedActors.push(updatedActor);
       }
      }
   }

   if(updatedActors.length > 0) film.actors = updatedActors;

   for (const category of updateFilmInput.categories) {
     if(category.id == null){
       const newCategory = Category.create({
         name: category.name,
       });
       await newCategory.save();
       updatedCategories.push(newCategory);
     }else{
       const updatedCategory = await Category.findOneBy({id: category.id});
       if(updatedCategory){
         updatedCategories.push(updatedCategory);
       }
     }
  }

  if(updatedCategories.length > 0) film.categories = updatedCategories;

   if(updateFilmInput.director){
    if(updateFilmInput.director.id == null){
      const {name, gender, yearOfBirth} = updateFilmInput.director;
      const newDirector = Director.create({name, gender, yearOfBirth});
      film.director = await newDirector.save();
    }else{
      const director = await Director.findOneBy({id: updateFilmInput.director.id});
      if(director){
        film.director = director;
      }
    }
   }

    return film.save();
  }

  async remove(removeFilmInputs: RemoveFilmInput[]): Promise<boolean>{
    try{
      for (const input of removeFilmInputs) {
        let flag = false;
        let film = await Film.findOne({
          where: {id: input.id},
          relations: ["categories", "actors"]
        });
        
        if(input.actors.length > 0){
          flag = true;
          film.actors = film.actors.filter(f => !input.actors.includes(f.id));
        }
    
        if(input.categories.length > 0){
          flag = true;
          film.categories = film.categories.filter(c => !input.categories.includes(c.id));
        }
    
        if(input.director != null){
          flag = true;
          film.director = null;
        }
    
        if(flag == false){
          await Film.remove(film);
        }else{
          await film.save();
        }
      }
      return true;
    }catch{
        return false;
    }
  }
}
