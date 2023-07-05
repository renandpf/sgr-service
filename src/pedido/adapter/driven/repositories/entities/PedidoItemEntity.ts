import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PedidoEntity } from "./PedidoEntity";
import { ProdutoEntity } from "../../../../../gerencial/adapter/driven/repositories/entities/ProdutoEntity";
import { PedidoItemDto } from "../../../../core/dtos/PedidoDto";

@Entity("PedidoItem")
export class PedidoItemEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({
    nullable: false
  })
  quantidade: number;

  @Column({
    type: "float",
    nullable: false
  })
  valorUnitario: number;

  @Column({
    type: "float",
    nullable: false
  })
  valorTotal: number;

  produtoId: number;

  @ManyToOne(() => ProdutoEntity, { nullable: false })
  produto: ProdutoEntity;

  @ManyToOne(() => PedidoEntity, (pedido) => pedido.itens, { nullable: false })
  pedido: PedidoEntity;

  constructor(item?: PedidoItemDto, pedidoEntity?: PedidoEntity) {
   if(item){
     if (item.produto) {
       this.produto = new ProdutoEntity(item.produto);
     }
     this.id = item.id;
     this.quantidade = item.quantidade;
     this.valorUnitario = item.valorUnitario;
     this.valorTotal = item.valorTotal;
   }

    if(pedidoEntity) {
      this.pedido = pedidoEntity;
    }
  }

  public getDto(): PedidoItemDto {

    return new PedidoItemDto(
      this.produto.getProdutoDto(),
      this.quantidade,
      this.valorUnitario,
      this.valorTotal,
      this.pedido?.id,
      this.id
    );
  }
}