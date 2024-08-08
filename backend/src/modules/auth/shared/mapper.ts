import { SignupUserDto } from '../dto/signup.dto';
import { CreateUserDto } from '../../user/dto/create-user.dto';

export const toCreateUserDto = (data: SignupUserDto): CreateUserDto => {  
    const { username, email, password } = data;
    let userDto: CreateUserDto = { username, email, password };
    return userDto;
};