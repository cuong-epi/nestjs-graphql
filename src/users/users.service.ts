import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  create(createUserInput: CreateUserInput) {
    const {username, password} = createUserInput;
    let user = User.create({username, password})
    return user.save();
  }

  findAll() {
    return User.find();
  }

  findOne(username: string) {
    return User.findOneBy({username: username});
  }
}
