import { Pergunta } from "src/perguntas/entities/pergunta.entity";
import { RespostaFavorita } from "src/respostas_favoritas/entities/respostas_favoritas.entity";
import { Usuario } from "src/usuarios/entities/usuario.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";

@Entity()
export class Resposta {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ length: 1000 })
    corpoResposta: string;

    @Column({nullable:true})
    midia: string;

    @Column({default: 0})
    votosTotais: number;

    @OneToMany(() => RespostaFavorita, respostaFavorita => respostaFavorita)
    respostaFavorita: RespostaFavorita[];

    @ManyToOne(() => Usuario, usuario => usuario.resposta, {
        onDelete: 'CASCADE'
    })
    usuario: Usuario;

    @ManyToOne(() => Pergunta, pergunta => pergunta.resposta, {
        onDelete: 'CASCADE'
    })
    pergunta: Pergunta;
}
