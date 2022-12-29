import { Pergunta } from "src/perguntas/entities/pergunta.entity";
import { Usuario } from "src/usuarios/entities/usuario.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

@Entity()
export class Resposta {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    id_usuario: number;

    @Column()
    id_pergunta: number;

    @Column({ length: 1000 })
    corpoResposta: string;

    @ManyToOne(() => Usuario, usuario => usuario.resposta)
    usuario: Usuario[];

    @ManyToOne(() => Pergunta, pergunta => pergunta.resposta)
    pergunta: Pergunta[];
}
