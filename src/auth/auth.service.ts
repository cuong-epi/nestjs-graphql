import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserInput } from './dto/create-user.input';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import { LoginResponse } from './dto/login-response';
dotenv.config();

@Injectable()
export class AuthService {
    constructor(private userService: UsersService, private jwtService: JwtService){}   

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.userService.findOne(username);
        const isValid = await bcrypt.compare(password, user.password);
        if(user && isValid){
            const {password, ...result} = user;
            return result;
        }
        return null;
    }

    login(user: User): LoginResponse {
        return {
            accessToken: this.jwtService.sign({username: user.username, sub: user.id}, {secret: process.env.JWT_SECRET_KEY, expiresIn: "1 days"}),
            user
        }
    }

    async signup(createUserInput: CreateUserInput){
        const user = await User.findOneBy({username: createUserInput.username});
        if(user){
            throw new Error("User already exists!");
        }
        const password = await bcrypt.hash(createUserInput.password, 10);   
        return User.save({...createUserInput, password});
    }
}
