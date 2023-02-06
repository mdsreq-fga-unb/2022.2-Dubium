import { PerguntaSalva } from "src/perguntas-salvas/entities/perguntas_salvas.entity";
import { PerguntaFavorita } from "src/perguntas_favoritas/entities/perguntas_favoritas.entity";
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

    @ManyToOne(() => Usuario, usuario => usuario.pergunta, {
        onDelete: 'CASCADE'
    })
    usuario: Usuario;

    @OneToMany(() => Resposta, resposta => resposta)
    resposta: Resposta[];

    @OneToMany(() => PerguntaSalva, perguntaSalva => perguntaSalva)
    perguntaSalva: PerguntaSalva[];

    @OneToMany(() => PerguntaFavorita, perguntaFavorita => perguntaFavorita)
    perguntaFavorita: PerguntaFavorita[];

    constructor(pergunta?:Partial<Pergunta>){
        this.id = pergunta?.id;
        this.corpoPergunta = pergunta?.corpoPergunta;
        this.filtro = pergunta?.filtro;
        this.id_cursoPergunta = pergunta?.id_cursoPergunta;
        this.midia = pergunta?.midia;
        this.resposta = pergunta?.resposta;
        this.tituloPergunta = pergunta?.tituloPergunta;
        this.usuario = pergunta?.usuario;
        this.votosTotais = pergunta?.votosTotais;
    }
}
