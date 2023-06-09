import { Produto } from "../../../gerencial/core/domain/Produto";
import { Pedido } from "./Pedido";
import { PedidoDto, PedidoItemDto } from "../dtos/PedidoDto";
import { ProdutoDto } from "../../../gerencial";

export class PedidoItem {
    get id(): number | undefined{
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get pedido(): Pedido | undefined{
        return this._pedido;
    }

    set pedido(value: Pedido) {
        this._pedido = value;
    }

    get produto(): Produto | undefined{
        return this._produto;
    }

    set produto(value: Produto) {
        this._produto = value;
    }

    get quantidade(): number | undefined{
        return this._quantidade;
    }

    set quantidade(value: number) {
        this._quantidade = value;
    }

    get valorUnitario(): number | undefined{
        return this._valorUnitario;
    }

    set valorUnitario(value: number) {
        this._valorUnitario = value;
    }

    get valorTotal(): number {
        if(this._quantidade !== undefined && this._valorUnitario !== undefined) {
            return this._quantidade * this._valorUnitario;
        }
        return 0;
    }
    constructor(
        public _id?: number,
        public _pedido?: Pedido,
        public _produto?: Produto,
        public _quantidade?: number,
        public _valorUnitario?: number,
    ){}

    public toPeditoItemDto(): PedidoItemDto{
        return new PedidoItemDto(
          new ProdutoDto(this._produto?.id),
          this._quantidade || 0,
          this._valorUnitario || 0,
          this.valorTotal,
          this._pedido?.id,
          this._id
        );
    }

    static getInstance(itemDto: PedidoItemDto): PedidoItem{
        return new PedidoItem(
          itemDto.id,
          new Pedido(itemDto.pedidoId),
          new Produto(itemDto.produto.id),
          itemDto.quantidade,
          itemDto.valorUnitario
        );
    }
}