import { AvisoSalvo } from "src/avisos-salvos/entities/avisos_salvos.entity";
import { Aviso } from "src/avisos/avisos.entity";
import { PerguntaSalva } from "src/perguntas-salvas/entities/perguntas_salvas.entity";
import { Pergunta } from "src/perguntas/entities/pergunta.entity";
import { PerguntaFavorita } from "src/perguntas_favoritas/entities/perguntas_favoritas.entity";
import { Resposta } from "src/respostas/entities/resposta.entity";
import { RespostaFavorita } from "src/respostas_favoritas/entities/respostas_favoritas.entity";
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
    password: string;

    @Column({default: 0})
    votosTotais: number;

    @OneToMany(() => Pergunta, pergunta => pergunta)
    pergunta: Pergunta[];

    @OneToMany(() => PerguntaSalva, perguntaSalva => perguntaSalva)
    perguntaSalva: PerguntaSalva[];

    @OneToMany(() => PerguntaFavorita, perguntaFavorita => perguntaFavorita)
    perguntaFavorita: PerguntaFavorita[];

    @OneToMany(() => AvisoSalvo, avisoSalvo => avisoSalvo)
    avisoSalvo: AvisoSalvo[];

    @OneToMany(() => Resposta, resposta => resposta)
    resposta: Resposta[];

    @OneToMany(() => RespostaFavorita, respostaFavorita => respostaFavorita)
    respostaFavorita: RespostaFavorita[];

    @OneToMany(() => Aviso, aviso => aviso)
    aviso: Aviso[];
}
