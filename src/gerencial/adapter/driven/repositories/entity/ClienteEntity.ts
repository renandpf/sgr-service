import { Maximum, MaxLength, Property, Required } from "@tsed/schema";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Cliente } from "../../../../core/domain/Cliente";

@Entity("Cliente")
export class ClienteEntity {
    @PrimaryGeneratedColumn()
    @Property()
    id: number;

    @Column()
    @MaxLength(100)
    @Required()
    nome: string;

    @Column()
    @MaxLength(11)
    @Required()
    cpf: string;

    @Column()
    @Maximum(100)
    email: string;

    public getDomain(): Cliente{
        return new Cliente(this.nome, this.cpf, this.email, this.id);
    }
}