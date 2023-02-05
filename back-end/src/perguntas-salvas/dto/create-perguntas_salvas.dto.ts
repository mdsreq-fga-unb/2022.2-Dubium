import {IsNotEmpty} from "class-validator";

export class CreatePerguntaSalvaDto {
    @IsNotEmpty()
    id_usuario: number;

    @IsNotEmpty()
    id_pergunta: number;
}