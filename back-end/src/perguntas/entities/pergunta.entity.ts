import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Pergunta {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    id_usuario: number;

    @Column({ length: 1000 })
    textoPergunta: string;
}
