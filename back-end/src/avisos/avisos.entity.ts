import { Resposta } from "src/respostas/entities/resposta.entity";
import { Usuario } from "src/usuarios/entities/usuario.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";

@Entity()
export class Aviso {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    tituloAviso: string;

    @Column({ length: 1000 })
    corpoAviso: string;
    
    @Column()
    id_cursoAviso: number;

    @Column({nullable:true})
    filtro: string;

    @Column({nullable:true})
    midia: string;

    @Column({default: 0})
    votosTotais: number;

    @ManyToOne(() => Usuario, usuario => usuario.aviso, {
        onDelete: 'CASCADE'
    })
    usuario: Usuario;

    @OneToMany(() => Resposta, resposta => resposta)
    resposta: Resposta[];

    constructor(aviso?:Partial<Aviso>){
        this.id = aviso?.id;
        this.corpoAviso = aviso?.corpoAviso;
        this.filtro = aviso?.filtro;
        this.id_cursoAviso = aviso?.id_cursoAviso;
        this.midia = aviso?.midia;
        this.resposta = aviso?.resposta;
        this.tituloAviso = aviso?.tituloAviso;
        this.usuario = aviso?.usuario;
        this.votosTotais = aviso?.votosTotais;
    }
}
