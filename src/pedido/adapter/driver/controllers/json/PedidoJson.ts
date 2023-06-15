import { PagamentoJson } from "./PagamentoJson";
import { Pedido } from "../../../../core/domain/Pedido";
import { CategoriaEnum, Cliente, Produto } from "../../../../../gerencial/core/domain";
import { Item } from "src/pedido/core/domain/Item";

import { Pagamento } from "src/pagamento/core/domain/Pagamento";

export class PedidoJson {
    public readonly idsRefeicao: number[];
    public readonly idsAcompanhamento: number[];
    public readonly idsBebida: number[];
    public readonly idsSobremesa: number[];
    public readonly observacao: string;

    public readonly clienteId: number;

    public readonly pagamento: PagamentoJson;

    public getDomain(): Pedido {
        let lanches:Produto[] = [];
        let acompanhamentos:Produto[] = [];
        let bebidas:Produto[] = [];
        let sobremesas:Produto[] = [];

        if(this.idsRefeicao) {
            lanches = this.idsRefeicao.map(id => new Produto(id, undefined, undefined, CategoriaEnum.LANCHE));
        }

        if(this.idsAcompanhamento) {
            acompanhamentos = this.idsRefeicao.map(id => new Produto(id, undefined, undefined, CategoriaEnum.ACOMPANHAMENTO));
        }
        
        if(this.idsBebida) {
            bebidas = this.idsRefeicao.map(id => new Produto(id, undefined, undefined, CategoriaEnum.BEBIDA));
        }

        if(this.idsSobremesa) {
            sobremesas = this.idsRefeicao.map(id => new Produto(id, undefined, undefined, CategoriaEnum.SOBREMESA));
        }

        const itens: Item[] = [];
        lanches.map(p => new Item(undefined, p)).forEach(i => itens.push(i));
        acompanhamentos.map(p => new Item(undefined, p)).forEach(i => itens.push(i));
        bebidas.map(p => new Item(undefined, p)).forEach(i => itens.push(i));
        sobremesas.map(p => new Item(undefined, p)).forEach(i => itens.push(i));

        const cliente = new Cliente(this.clienteId, undefined, undefined);

        const pagamentos = this.pagamento.cartoesCreditos.map(cc => new Pagamento(cc.numero, cc.cvv, cc.nome, cc.cpf));

        return new Pedido(undefined, itens, cliente, pagamentos, this.observacao);
    }

}