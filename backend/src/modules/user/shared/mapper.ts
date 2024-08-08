import { UserEntity } from '../entities/user.entity';
import { UserDto } from '../dto/user.dto';

export const toUserDto = (data: UserEntity): UserDto => {  
    const { id, username, email, isActive } = data;
    let userDto: UserDto = { id, username, email, isActive };
    return userDto;
};