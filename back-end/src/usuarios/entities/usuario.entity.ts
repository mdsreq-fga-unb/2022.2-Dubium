import { Pergunta } from "src/perguntas/entities/pergunta.entity";
import { PerguntasUsuario } from "src/perguntas_usuario/perguntas_usuario.entity";
import { Resposta } from "src/respostas/entities/resposta.entity";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";


@Entity()
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    nome_completo: string;

    @Column({ length: 100 })
    curso: string;

    @OneToMany(() => Pergunta, pergunta => pergunta)
    pergunta: Pergunta[];

    @OneToMany(() => Resposta, resposta => resposta)
    resposta: Resposta[];
}
