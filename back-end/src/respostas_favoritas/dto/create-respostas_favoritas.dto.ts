import {IsNotEmpty} from "class-validator";

export class CreateRespostaFavoritaDto {
    @IsNotEmpty()
    id_usuario: number;

    @IsNotEmpty()
    id_resposta: number;
}