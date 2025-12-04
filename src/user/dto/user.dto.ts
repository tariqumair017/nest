import { IsEmail, IsEnum, IsInt, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, Min, MinLength } from "class-validator";
import { Role } from "@prisma/client";

export class CreateUserDto {
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsPhoneNumber('PK')
    phone: string

    @IsString()
    @MinLength(6)
    password: string

    @IsOptional()
    @IsString()
    name?: string

    @IsOptional()
    @IsInt()
    @Min(0)
    age?: number

    @IsOptional()
    @IsEnum(Role)
    role?: Role
}

export class UpdateUserDto {
    @IsOptional()
    @IsEmail()
    email?: string

    @IsOptional()
    @IsPhoneNumber('PK')
    phone?: string

    @IsOptional()
    @IsString()
    name?: string

    @IsOptional()
    @IsInt()
    @Min(0)
    age?: number

    @IsOptional()
    @IsEnum(Role)
    role?: Role
}