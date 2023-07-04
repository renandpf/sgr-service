import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Cliente } from "../../../../core/domain/Cliente";
import { PedidoEntity } from "../../../../../pedido/adapter/driven/repositories/entities/PedidoEntity";
import { ClienteDto } from "../../../../core/dto/cliente/ClienteDto";
import { Deprecated } from "@tsed/schema";

@Entity("Cliente")
export class ClienteEntity {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({
        type: "varchar",
        length: 100,
        nullable: true
    })
    nome?: string;

    @Column({
        type: "varchar",
        length: 11,
        nullable: false
    })
    cpf?: string;

    @Column({
        type: "varchar",
        length: 100,
        nullable: true
    })
    email?: string;

    @OneToMany(() => PedidoEntity, (pedido) => pedido.cliente)
    pedidos?: PedidoEntity[];

    constructor(cliente?: ClienteDto){
        if(cliente){
            if(cliente.id){
                this.id = cliente.id;
            }
            this.nome = cliente.nome;
            this.email = cliente.email;
            if(cliente.cpf) {
                this.cpf = cliente.cpf;
            }
        }
    }

    public getClientDto(): ClienteDto {
        return new ClienteDto(this.id, this.nome, this.cpf, this.email);
    }

    //FIXME: deve ser removido. Usar getClientDto()
    @Deprecated()
    public getDomain(): Cliente {
        return new Cliente(this.id, this.nome, this.cpf, this.email);
    }


}