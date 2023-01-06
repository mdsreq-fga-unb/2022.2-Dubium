import { Usuario } from "src/usuarios/entities/usuario.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

@Entity()
export class PerguntasUsuario {
    @PrimaryGeneratedColumn()
    id: number;

   @Column()
   id_usuario: number;

   @Column()
   id_pergunta: number;

   @ManyToOne(() => Usuario, usuario => usuario.pergunta)
   usuario: Usuario[];
}