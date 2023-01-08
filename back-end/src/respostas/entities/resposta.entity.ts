import { Pergunta } from "src/perguntas/entities/pergunta.entity";
import { Usuario } from "src/usuarios/entities/usuario.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from "typeorm";

@Entity()
export class Resposta {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ length: 1000 })
    corpoResposta: string;

    @CreateDateColumn()
    create_at: Date;

    @ManyToOne(() => Usuario, usuario => usuario.resposta, {
        onDelete: 'CASCADE'
    })
    usuario: Usuario;

    @ManyToOne(() => Pergunta, pergunta => pergunta.resposta, {
        onDelete: 'CASCADE'
    })
    pergunta: Pergunta;
}
