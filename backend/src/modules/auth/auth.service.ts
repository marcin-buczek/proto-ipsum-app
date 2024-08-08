import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { LoginUserDto } from './dto/login.dto';
import { SignupUserDto } from './dto/signup.dto';
import { RegistrationStatus } from './interfaces/registration-status.interface';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserDto } from '../user/dto/user.dto';
import { toCreateUserDto } from './shared/mapper';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(payload: JwtPayload): Promise<UserDto> {
    const user = await this.userService.findByPayload(payload);
    if (!user) throw new UnauthorizedException('Invalid token.');
    return user;
  }

  async login(loginUserDto: LoginUserDto): Promise<any> {
    const user = await this.userService.findByLogin(loginUserDto);
    const token = this._createToken(user);
    return {
      email: user.email, ...token,    
    };
  }

  private _createToken({ email, id }: UserDto): any {
    const user: JwtPayload = { email, sub: id };    
    const accessToken = this.jwtService.sign(user);    
    return {
        expiresIn: process.env.EXPIRESIN,
        accessToken,    
    };  
}

  async register(userDto: CreateUserDto): Promise<RegistrationStatus> {
    let status: RegistrationStatus = {
        success: true,   
        message: 'User registered.',
    };
    try {
        await this.userService.create(userDto);
    } catch (err) {
        status = {
            success: false,        
            message: err instanceof Error ? err.message : 'An unknown error occurred.',
        };
    }
    return status;  
  }

  async signup(signupUserDto: SignupUserDto): Promise<any> {
    if(signupUserDto.password !== signupUserDto.confirm_password) throw new BadRequestException('Passwords do not match.');
    // check if is not robot / captcha 

    const newUserDto = toCreateUserDto(signupUserDto);
    const result: 
    RegistrationStatus = await this.register(newUserDto);
    if (!result.success) throw new BadRequestException(result.message);
    return result; 
  }

  async logout(user: any) {
    // Invalider le token JWT ou gérer la déconnexion ici
    // Par exemple, ajouter le token à une liste de révocation
    // Ou simplement retourner un message de succès si la gestion est côté client
    return { message: 'Déconnexion réussie' };
  }
}