import { Pedido } from "../../../../core/domain/Pedido";
import { Cliente, Produto } from "../../../../../gerencial/core/domain";
import { Item } from "src/pedido/core/domain/Item";
import { CollectionOf, Description, Example, Property } from "@tsed/schema";

export class PedidoItemCadastroJson {

    @Description("Qauntidade do Produto")
    @Example("5")
    @Property()
    public quantidade?: number;

    @Description("Identificador do Produto")
    @Example("123456")
    @Property()
    public produtoId?: number
}

export class PedidoCadastroJson {

    @Description("Observação")
    @Example("Sem cebola")
    @Property()
    public readonly observacao?: string;

    @Description("Cliente")
    @Example("123456")
    @Property()
    public readonly clienteId?: number;

    @Description("Itens do Pedido")
    @CollectionOf(PedidoItemCadastroJson)
    public readonly itens: PedidoItemCadastroJson[];

    public getDomain(): Pedido {

        let cliente = undefined;
        if(this.clienteId){
            cliente = new Cliente(this.clienteId);
        }

        const pedido = new Pedido(undefined, cliente, this.observacao);

        pedido.itens = this.itens.map(i => {
            return new Item(undefined, pedido, new Produto(i.produtoId), i.quantidade);
        });

        return pedido;
    }
}
