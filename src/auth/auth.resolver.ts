import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import { AuthService } from './auth.service';
import { CreateUserInput } from './dto/create-user.input';
import { LoginResponse } from './dto/login-response';
import { LoginUserInput } from './dto/login-user.input';
import { GqlAuthGuard } from './gql-auth.guard';

@Resolver()
export class AuthResolver {
    constructor(private authService: AuthService){}

    @Query(() => LoginResponse)
    @UseGuards(GqlAuthGuard)
    login(@Args("loginUserInput") loginUserInput: LoginUserInput, @Context() context){
        return this.authService.login(context.user);
    }

    @Mutation(() => User)
    signup(@Args("createUserInput") createUserInput: CreateUserInput){
        return this.authService.signup(createUserInput);
    }
}
