import { Controller, Request, Post, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { LoginUserDto } from './dto/login.dto';
import { SignupUserDto } from './dto/signup.dto';
import { RegistrationStatus } from './interfaces/registration-status.interface';
import { LoginStatus } from './interfaces/login-status.interface';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  @Post('connexion')
  async login(@Body() loginUserDto: LoginUserDto): Promise<LoginStatus> {
    return await this.authService.login(loginUserDto);
  }

  @Post('inscription')
  async signup(@Body() signupUserDto: SignupUserDto): Promise<RegistrationStatus> {
    return await this.authService.signup(signupUserDto);
  }

  @Post('check-email')
  async checkEmail(@Body('email') email: string): Promise<{ isEmailUnique: boolean }> {
    const isEmailUnique = await this.userService.isEmailUnique(email);
    return { isEmailUnique };
  }

  @Post('logout')
  async logout(@Request() req) {
    // Invalider le token JWT ou gérer la déconnexion ici
    return this.authService.logout(req.user);
  }
}
