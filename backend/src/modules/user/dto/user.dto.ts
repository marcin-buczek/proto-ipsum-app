import { IsNumber, IsString, IsEmail, IsNotEmpty, IsBoolean } from 'class-validator';

export class UserDto {
  @IsNotEmpty() @IsNumber() id: number;
  @IsNotEmpty() @IsString() username: string;
  @IsNotEmpty() @IsEmail() email: string;
  @IsNotEmpty() @IsBoolean() isActive: boolean;
}