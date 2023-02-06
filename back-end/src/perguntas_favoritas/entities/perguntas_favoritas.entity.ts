import { Usuario } from "src/usuarios/entities/usuario.entity";
import { Pergunta } from "src/perguntas/entities/pergunta.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";

@Entity()
export class PerguntaFavorita {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Usuario, usuario => usuario.perguntaFavorita, {
        onDelete: 'CASCADE'
    })
    usuario: Usuario;

    @ManyToOne(() => Pergunta, pergunta => pergunta.perguntaFavorita, {
        onDelete: 'CASCADE'
    })
    pergunta: Pergunta;

    constructor(perguntaFavorita?:Partial<PerguntaFavorita>){
        this.id = perguntaFavorita?.id;
        this.pergunta = perguntaFavorita?.pergunta;
        this.usuario = perguntaFavorita?.usuario;
    }
}