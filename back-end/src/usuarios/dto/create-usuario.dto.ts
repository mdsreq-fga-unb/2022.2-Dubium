import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsNumber, MinLength, Validate, MaxLength, IsEmail } from "class-validator";
import { PasswordValidation, PasswordValidationRequirement } from 'class-validator-password-check'


var passwordRequirement: PasswordValidationRequirement = {
    mustContainLowerLetter: true,
    mustContainNumber: true,
    mustContainSpecialCharacter: true,
    mustContainUpperLetter: true
}
export class CreateUsuarioDto {
    @IsString()
    @IsNotEmpty()
    nome_completo: string;
    
    @IsNumber()
    @IsNotEmpty()
    curso: number;

    @IsOptional()
    @IsString()
    matricula: number;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    celular: string;  

    @IsString()
    @MinLength(6)
    @MaxLength(20)
    @Validate(PasswordValidation, [passwordRequirement])
    password: string;
}
