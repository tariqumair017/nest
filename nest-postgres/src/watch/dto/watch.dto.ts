import { IsEmail, IsEnum, IsInt, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, Min, MinLength } from "class-validator";


export class CreateWatchDto {   
    @IsString()
    name: string

    @IsString()
    brand: string
 
    @IsOptional()
    @IsInt()
    @Min(10)
    price?: number 
}

export class UpdateWatchDto {
    @IsOptional()
    @IsString()
    name?: string

    @IsOptional()
    @IsString()
    brand?: string
 
    @IsOptional()
    @IsInt()
    @Min(10)
    price?: number 
}