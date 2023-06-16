import {Property,} from "@tsed/schema";
import { ClienteEntity } from "src/gerencial/adapter/driven/repositories/entity";
import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { ItemEntity } from "./ItemEntity";
import { Pedido } from "src/pedido/core/domain/Pedido";
import { StatusPedidoMapper } from "./StatusMapper";

@Entity("Pedido")
export class PedidoEntity {
  @PrimaryGeneratedColumn()
  @Property()
  id?: number;

  @Column()
  statusId?: number;

  @ManyToOne(() => ClienteEntity, (cliente) => cliente.pedidos, {nullable: true})
  cliente?: ClienteEntity;
  
  @OneToMany(() => ItemEntity, (item) => item.pedido)
  itens?: ItemEntity[];

  constructor(pedido?: Pedido){
    this.id = pedido?.id;
    
    this.itens = pedido?.itens?.map(i => new ItemEntity(i, this));
    this.statusId = StatusPedidoMapper.mapper(pedido?.getStatus());
    
    console.log('A');
    if(pedido?.temCliente()){
      console.log('B');
      this.cliente = new ClienteEntity(pedido?.cliente);
    }
  }

}