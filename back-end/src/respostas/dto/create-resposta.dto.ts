import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsNumber, MaxLength } from "class-validator";

export class CreateRespostaDto {
    
    @IsNotEmpty()
    id_usuario: number;

    @IsNotEmpty()
    id_pergunta: number;

    @MaxLength(500)
    @IsNotEmpty()
    corpoResposta: string;

    @IsOptional()
    midia: string;
}
