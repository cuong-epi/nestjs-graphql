import { Injectable } from '@nestjs/common';
import { CreateCategoryInput } from './dto/create-category.input';
import { RemoveCategoryInput } from './dto/remove-category.input';
import { SearchCategoryArgs } from './dto/search-category.args';
import { UpdateCategoryInput } from './dto/update-category.input';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {

  findAll(args: SearchCategoryArgs): Promise<Category[]> {
      let query = Category.createQueryBuilder("category")
                          .leftJoin('category.films', "film")
                          .where("1=1")
      
      if(args.id != 0){
        query = query.andWhere("category.id = :id", {id: args.id})
      }

      if(args.name != ""){
        query = query.andWhere("LOWER(category.name) = LOWER(:name)", {name: args.name})
      }

      if(args.filmId != 0){
        query = query.andWhere("film.id = :filmId", {filmId: args.filmId})
      }

      return query.orderBy("category.name", "ASC")
                  .skip(args.skip)
                  .limit(args.limit)
                  .getMany();
  }

  findOneById(id: number): Promise<Category | null> {
    return Category.findOneBy({id});
  }

  async create(createCategoryInput: CreateCategoryInput) {
    let category = Category.create({name: createCategoryInput.name})
    return category.save();
  }

  async update(updateCategoryInput: UpdateCategoryInput) {
    let actor = await Category.findOneBy({id: updateCategoryInput.id});
    actor.name = updateCategoryInput.name;
    return actor.save();
  }

  async remove(removeCategoryInputs: RemoveCategoryInput[]): Promise<boolean> {
    try{
      for (const input of removeCategoryInputs) {
        let flag = false;
        let category = await Category.findOne({
          where: {id: input.id},
          relations: ["films"]
        });
        
        if(input.films.length > 0){
          flag = true;
          category.films = category.films.filter(c => !input.films.includes(c.id));
        }
    
        if(flag == false){
          await Category.remove(category);
        }else{
          await category.save();
        }
      }
      return true;
    }catch{
        return false;
    }
  }
}
