import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsNumber, MaxLength } from "class-validator";

export class CreateAvisoDto {

    @IsNotEmpty()
    id_usuario: number;

    @IsOptional()
    tituloAviso: string;

    @MaxLength(1000)
    @IsNotEmpty()
    corpoAviso: string;

    @IsNotEmpty()
    id_cursoAviso: number;

    @IsNotEmpty()
    filtro: string;

    @IsOptional()
    midia: string;

    @IsNumber()
    votosTotais: number;
}