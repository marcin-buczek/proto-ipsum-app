import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class SignupUserDto {
  @IsNotEmpty() @IsString() readonly username: string;
  @IsNotEmpty() @IsEmail() readonly email: string;
  @IsNotEmpty() @IsString() readonly password: string;
  @IsNotEmpty() @IsString() readonly confirm_password: string;
}