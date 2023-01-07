import { Resposta } from "src/respostas/entities/resposta.entity";
import { Usuario } from "src/usuarios/entities/usuario.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";

@Entity()
export class Pergunta {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    tituloPergunta: string;

    @Column({ length: 1000 })
    corpoPergunta: string;
    
    @Column()
    id_cursoPergunta: number;

    @Column({nullable:true})
    filtro: string;

    @Column({nullable:true})
    midia: string;

    @Column({default: 0})
    votosTotais: number;

    @ManyToOne(() => Usuario, usuario => usuario.pergunta)
    usuario: Usuario;

    @OneToMany(() => Resposta, resposta => resposta)
    resposta: Resposta[];
}
