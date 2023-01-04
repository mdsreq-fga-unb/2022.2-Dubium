import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsNumber } from "class-validator";

export class CreateRespostaDto {
    
    @IsNotEmpty()
    id_usuario: number;

    @IsNotEmpty()
    id_pergunta: number;

    @IsNotEmpty()
    corpoResposta: string;
}
