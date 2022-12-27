import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Resposta {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    id_usuario: number;

    @Column()
    id_pergunta: number;

    @Column({ length: 1000 })
    textoResposta: string;
}
