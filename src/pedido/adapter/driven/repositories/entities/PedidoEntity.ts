import {Property,} from "@tsed/schema";
import { ClienteEntity } from "src/gerencial/adapter/driven/repositories/entity";
import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { ItemEntity } from "./ItemEntity";
import { Pedido } from "src/pedido/core/domain/Pedido";
import { StatusPedido } from "src/pedido/core/domain/StatusPedido";

@Entity("Pedido")
export class PedidoEntity {
  @PrimaryGeneratedColumn()
  @Property()
  id?: number;

  @Column()
  statusId: number;


  @ManyToOne(() => ClienteEntity, (cliente) => cliente.pedidos)
  cliente?: ClienteEntity;
  
  @OneToMany(() => ItemEntity, (item) => item.pedido)
  itens?: ItemEntity[];

  constructor(pedido?: Pedido){
    this.id = pedido?.id;
    
    this.itens = pedido?.itens?.map(i => new ItemEntity(i, this));
    this.cliente = new ClienteEntity(pedido?.cliente);
    const status = pedido?.getStatus();
    this.statusId = (StatusPedido as never)[status] + 1;
    

  }

}