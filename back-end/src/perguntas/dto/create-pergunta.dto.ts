import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsNumber } from "class-validator";

export class CreatePerguntaDto {

    @IsNotEmpty()
    id_usuario: number;

    @IsOptional()
    tituloPergunta: string;

    @IsNotEmpty()
    corpoPergunta: string;

    @IsNotEmpty()
    id_cursoPergunta: number;

    @IsNumber()
    votosTotais: number;
}