import { Usuario } from "src/usuarios/entities/usuario.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { Resposta } from "src/respostas/entities/resposta.entity";

@Entity()
export class RespostaFavorita {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Usuario, usuario => usuario.respostaFavorita, {
        onDelete: 'CASCADE'
    })
    usuario: Usuario;

    @ManyToOne(() => Resposta, resposta => resposta.respostaFavorita, {
        onDelete: 'CASCADE'
    })
    resposta: Resposta;

    constructor(respostaFavorita?:Partial<RespostaFavorita>){
        this.id = respostaFavorita?.id;
        this.resposta = respostaFavorita?.resposta;
        this.usuario = respostaFavorita?.usuario;
    }
}