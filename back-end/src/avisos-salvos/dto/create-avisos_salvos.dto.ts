import {IsNotEmpty} from "class-validator";

export class CreateAvisoSalvoDto {
    @IsNotEmpty()
    id_usuario: number;

    @IsNotEmpty()
    id_aviso: number;
}