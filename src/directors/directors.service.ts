import { Injectable } from '@nestjs/common';
import { CreateDirectorInput } from './dto/create-director.input';
import { RemoveDirectorInput } from './dto/remove-director.input';
import { SearchDirectorArgs } from './dto/search-director.args';
import { UpdateDirectorInput } from './dto/update-director.input';
import { Director } from './entities/director.entity';

@Injectable()
export class DirectorsService {

  findAll(args: SearchDirectorArgs): Promise<Director[]> {
     let query = Director.createQueryBuilder("director")
                        .leftJoin('director.films', "film")
                        .where("1=1")
      
      if(args.id != 0){
        query = query.andWhere("director.id = :id", {id: args.id});
      }

      if(args.name != ""){
        query = query.andWhere("LOWER(director.name) = LOWER(:name)", {name: args.name});
      }

      if(args.gender != 0){
        query = query.andWhere("director.gender = :gender", {gender: args.gender});
      }

      if(args.filmId != 0){
        query = query.andWhere("film.id = :filmId", {filmId: args.filmId});
      }

      return query.orderBy("director.name", "ASC")
                  .skip(args.skip)
                  .limit(args.limit)
                  .getMany();
  }

  findOneById(id: number): Promise<Director | null> {
    return Director.findOneBy({id});
  }

  async create(createDirectorInput: CreateDirectorInput) {
    const {name, gender, yearOfBirth} = createDirectorInput;
    let director = Director.create({name, gender, yearOfBirth})
    return director.save();
  }

  async update(updateDirectorInput: UpdateDirectorInput) {
    let director = await Director.findOneBy({id: updateDirectorInput.id});

    if(updateDirectorInput.name != null) director.name = updateDirectorInput.name;
    if(updateDirectorInput.gender != null) director.gender = updateDirectorInput.gender;
    if(updateDirectorInput.yearOfBirth != null) director.yearOfBirth = updateDirectorInput.yearOfBirth;

    return director.save();
  }

  async remove(removeDirectorInputs: RemoveDirectorInput[]): Promise<boolean> {
    try{
      for (const input of removeDirectorInputs) {
        let flag = false;
        let director = await Director.findOne({
          where: {id: input.id},
          relations: ["films"]
        });
        
        if(input.films.length > 0){
          flag = true;
          director.films = director.films.filter(c => !input.films.includes(c.id));
        }
    
        if(flag == false){
          await Director.remove(director);
        }else{
          await director.save();
        }
      }
      return true;
    }catch{
        return false;
    }
  }
}
