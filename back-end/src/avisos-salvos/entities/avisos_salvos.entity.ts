import { Aviso } from "src/avisos/avisos.entity";
import { Usuario } from "src/usuarios/entities/usuario.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";

@Entity()
export class AvisoSalvo {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Usuario, usuario => usuario.perguntaSalva, {
        onDelete: 'CASCADE'
    })
    usuario: Usuario;

    @ManyToOne(() => Aviso, aviso => aviso.avisoSalvo, {
        onDelete: 'CASCADE'
    })
    aviso: Aviso;

    constructor(avisoSalvo?:Partial<AvisoSalvo>){
        this.id = avisoSalvo?.id;
        this.aviso = avisoSalvo?.aviso;
        this.usuario = avisoSalvo?.usuario;
    }
}