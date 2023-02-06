import {IsNotEmpty} from "class-validator";

export class CreatePerguntaFavoritaDto {
    @IsNotEmpty()
    id_usuario: number;

    @IsNotEmpty()
    id_pergunta: number;
}