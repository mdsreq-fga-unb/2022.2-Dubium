import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsNumber } from "class-validator";


export class UpdateUsuarioDto {
    @IsString()
    @IsNotEmpty()
    nome_completo: string;
    
    @IsNumber()
    @IsNotEmpty()
    curso: string;

    @IsString()
    @IsOptional()
    fotoPerfil: string
}