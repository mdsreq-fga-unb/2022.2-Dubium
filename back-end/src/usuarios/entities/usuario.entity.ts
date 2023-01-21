import { Aviso } from "src/avisos/avisos.entity";
import { Pergunta } from "src/perguntas/entities/pergunta.entity";
import { Resposta } from "src/respostas/entities/resposta.entity";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";


@Entity()
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    nome_completo: string;

    @Column()
    curso: number;

    @Column()
    matricula: number;

    @Column({ length: 100 })
    email: string;

    @Column()
    celular: string;

    @Column()
    senha: string;

    @Column({default: 0})
    votosTotais: number;

    @OneToMany(() => Pergunta, pergunta => pergunta)
    pergunta: Pergunta[];

    @OneToMany(() => Resposta, resposta => resposta)
    resposta: Resposta[];

    @OneToMany(() => Aviso, aviso => aviso)
    aviso: Aviso[];
}
