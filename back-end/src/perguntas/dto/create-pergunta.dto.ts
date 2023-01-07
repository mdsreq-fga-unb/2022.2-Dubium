import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsNumber, MaxLength } from "class-validator";

export class CreatePerguntaDto {

    @IsNotEmpty()
    id_usuario: number;

    @IsOptional()
    tituloPergunta: string;

    @MaxLength(1000)
    @IsNotEmpty()
    corpoPergunta: string;

    @IsNotEmpty()
    id_cursoPergunta: number;

    @IsOptional()
    filtro: string;

    @IsOptional()
    midia: string;

    @IsNumber()
    votosTotais: number;
}