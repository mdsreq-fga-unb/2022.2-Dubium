import { IsString, IsNotEmpty, IsOptional, IsBoolean } from "class-validator";


export class CreateUsuarioDto {
    @IsString()
    @IsNotEmpty()
    nome_completo: string;
    
    @IsString()
    @IsNotEmpty()
    curso: string;
}
