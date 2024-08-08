import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { toUserDto } from './shared/mapper';
import { LoginUserDto } from '../auth/dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(userDto: CreateUserDto): Promise<UserDto> {
    const { username, password, email } = userDto;
    const userInDb = await this.userRepository.findOne({ where: { email } });
    if (userInDb) throw new BadRequestException('User already exists.');

    const user: UserEntity = this.userRepository.create({ username, password, email });
    await this.userRepository.save(user);
    return toUserDto(user);
  }

  async findByLogin({ email, password }: LoginUserDto): Promise<UserDto> {    
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) throw new UnauthorizedException('User not found.');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new BadRequestException('User exists but bad password.');
    
    return toUserDto(user);  
  }

  async findByPayload({ email }: any): Promise<UserDto> {
    return await this.findOne({ where:  { email } });  
  }

  async isEmailUnique(email: string): Promise<boolean> {
    const user = await this.findByEmail(email);
    return !user;
  }

  async findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async findOne(options?: object): Promise<UserDto> {
    const user =  await this.userRepository.findOne(options);    
    return toUserDto(user);  
  }

  async findById(id: number): Promise<UserEntity> {
    return this.userRepository.findOneBy({ id });
  }

  async findByUsername(username: string): Promise<UserEntity> {
    return this.userRepository.findOneBy({ username });
  }

  async findByEmail(email: string): Promise<UserEntity> {
    return this.userRepository.findOneBy({ email });
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.userRepository.delete(id);
  }
}
