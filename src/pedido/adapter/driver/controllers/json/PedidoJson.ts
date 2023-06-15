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
        const lanches:Produto[] = this.mapIdToProduto(this.idsRefeicao, CategoriaEnum.LANCHE);
        const acompanhamentos:Produto[] = this.mapIdToProduto(this.idsAcompanhamento, CategoriaEnum.ACOMPANHAMENTO);
        const bebidas:Produto[] = this.mapIdToProduto(this.idsBebida, CategoriaEnum.BEBIDA);
        const sobremesas:Produto[] = this.mapIdToProduto(this.idsSobremesa, CategoriaEnum.SOBREMESA);

        const itens: Item[] = this.getItens(lanches, acompanhamentos, bebidas, sobremesas);

        const cliente = new Cliente(this.clienteId, undefined, undefined);

        const pagamentos = this.pagamento.cartoesCreditos.map(cc => new Pagamento(cc.numero, cc.cvv, cc.nome, cc.cpf));

        return new Pedido(undefined, itens, cliente, pagamentos, this.observacao);
    }

    private getItens(lanches: Produto[], acompanhamentos: Produto[], bebidas: Produto[], sobremesas: Produto[]) {
        const itens: Item[] = [];
        lanches.map(p => new Item(undefined, p)).forEach(i => itens.push(i));
        acompanhamentos.map(p => new Item(undefined, p)).forEach(i => itens.push(i));
        bebidas.map(p => new Item(undefined, p)).forEach(i => itens.push(i));
        sobremesas.map(p => new Item(undefined, p)).forEach(i => itens.push(i));
        return itens;
    }

    private mapIdToProduto(ids: number[], categoria: CategoriaEnum): Produto[]{
        if(ids === undefined){
            return [];
        }
        return ids.map(id => new Produto(id, undefined, undefined, categoria));
    }
}