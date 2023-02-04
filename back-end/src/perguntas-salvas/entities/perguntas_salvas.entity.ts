import { Usuario } from "src/usuarios/entities/usuario.entity";
import { Pergunta } from "src/perguntas/entities/pergunta.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";

@Entity()
export class PerguntaSalva {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Usuario, usuario => usuario.perguntaSalva, {
        onDelete: 'CASCADE'
    })
    usuario: Usuario;

    @ManyToOne(() => Pergunta, pergunta => pergunta.perguntaSalva, {
        onDelete: 'CASCADE'
    })
    pergunta: Pergunta;

    constructor(perguntaSalva?:Partial<PerguntaSalva>){
        this.id = perguntaSalva?.id;
        this.pergunta = perguntaSalva?.pergunta;
        this.usuario = perguntaSalva?.usuario;
    }
}