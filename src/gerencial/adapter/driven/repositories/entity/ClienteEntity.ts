import { Maximum, MaxLength, Property, Required } from "@tsed/schema";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Cliente } from "../../../../core/domain/Cliente";
import { PedidoEntity } from "../../../../../pedido/adapter/driven/repositories/entities/PedidoEntity";

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

    @OneToMany(() => PedidoEntity, (pedido) => pedido.cliente)
    pedidos: PedidoEntity[];

    public getDomain(): Cliente{
        return new Cliente(this.id, this.nome, this.cpf, this.email, undefined, undefined);
    }
}