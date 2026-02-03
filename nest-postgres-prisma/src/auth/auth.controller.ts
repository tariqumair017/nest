import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, Min, MinLength } from 'class-validator';
import { Throttle } from '@nestjs/throttler';

class SignUpDto {
  @IsEmail()
  email: string;

  @IsPhoneNumber('PK')
  phone: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  age?: number;
}

class SignInDto {
  @IsString()
  @IsNotEmpty()
  emailOrPhone: string;

  @IsString()
  @MinLength(6)
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() dto: SignUpDto) {
    return this.authService.signUp(dto);
  }
 
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @Throttle({ default: {limit: 3, ttl: 60000} })
  async signIn(@Body() dto: SignInDto) {
    return this.authService.signIn(dto.emailOrPhone, dto.password);
  }
}


