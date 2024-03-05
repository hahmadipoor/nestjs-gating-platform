import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

const MIN_LENGTH = 42;
const MAX_LENGTH = 42;

export class FindUserDto {
  
    @IsString()
    @IsNotEmpty()
    @MinLength(MIN_LENGTH,{message:`account address should be more than ${MAX_LENGTH} characters`})
    @MaxLength(MAX_LENGTH,{message:`account address should be less than ${MAX_LENGTH}`})  
    address: string;
}