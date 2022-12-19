import { Injectable } from '@nestjs/common';
import { CreateActorInput } from './dto/create-actor.input';
import { RemoveActorInput } from './dto/remove-actor.input';
import { SearchActorArgs } from './dto/search-actor.args';
import { UpdateActorInput } from './dto/update-actor.input';
import { Actor } from './entities/actor.entity';

@Injectable()
export class ActorsService {

  findAll(args: SearchActorArgs): Promise<Actor[]> {
      let query = Actor.createQueryBuilder("actor")
                      .leftJoin('actor.films', "film")
                      .where("1=1")
      
      if(args.id != 0){
        query = query.andWhere("actor.id = :id", {id: args.id})
      }
      
      if(args.name != ""){
        query = query.andWhere("LOWER(actor.name) = LOWER(:name)", {name: args.name})
      }

      if(args.gender != 0){
        query = query.andWhere("actor.gender = :gender", {gender: args.gender})
      }

      if(args.filmId != 0){
        query = query.andWhere("film.id = :filmId", {filmId: args.filmId})
      }
      
      return query.orderBy("actor.name", "ASC")
                  .skip(args.skip)
                  .limit(args.limit)
                  .getMany();
  }

  findOneById(id: number): Promise<Actor> {
    return Actor.findOneBy({id});
  }

  async create(createActorInput: CreateActorInput) {
    const {name, gender, yearOfBirth} = createActorInput;
    let actor = Actor.create({name, gender, yearOfBirth})
    return actor.save();
  }

  async update(updateActorInput: UpdateActorInput): Promise<Actor> {
    let actor = await Actor.findOneBy({id: updateActorInput.id});
    if(updateActorInput.name != null) actor.name = updateActorInput.name;
    if(updateActorInput.gender != null) actor.gender = updateActorInput.gender;
    if(updateActorInput.yearOfBirth != null) actor.yearOfBirth = updateActorInput.yearOfBirth;
    return actor.save();
  }

  async remove(removeActorInputs: RemoveActorInput[]): Promise<boolean> {
    try{
      for (const input of removeActorInputs) {
        let flag = false;
        let actor = await Actor.findOne({
          where: {id: input.id},
          relations: ["films"]
        });
        
        if(input.films.length > 0){
          flag = true;
          actor.films = actor.films.filter(c => !input.films.includes(c.id));
        }
    
        if(flag == false){
          await Actor.remove(actor);
        }else{
          await actor.save();
        }
      }
      return true;
    }catch{
        return false;
    }
  }
}
