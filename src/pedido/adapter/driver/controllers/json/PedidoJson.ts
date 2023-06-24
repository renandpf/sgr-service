import { Pedido } from "../../../../core/domain/Pedido";
import { CategoriaEnum, Cliente, Produto } from "../../../../../gerencial/core/domain";
import { Item } from "src/pedido/core/domain/Item";
import { Description, Enum, Example, Property } from "@tsed/schema";
import { StatusPedido } from "../../../../core/domain/StatusPedido";
import { StatusPedidoEnumMapper } from "../../../../core/domain/StatusPedidoEnumMapper";
import { OnSerialize } from "@tsed/json-mapper";

export class PedidoJson {
    @Description("Identificador")
    @Example("123456")
    @Property()
    public readonly id?: number;

    @Description("Observação")
    @Example("Sem cebola")
    @Property()
    public readonly observacao?: string;

    @Description("Cliente")
    @Example("123456")
    @Property()
    public readonly clienteId?: number;

    @Description("Categoria")
    @Example("RECEBIDO")
    @Enum(  "AGUARDANDO_PAGAMENTO", 
            "AGUARDANDO_CONFIRMACAO_PAGAMENTO", 
            "PAGO", 
            "PREPARANDO", 
            "PRONTO", 
            "FINALIZADO",
            "PAGAMENTO_INVALIDO")
    @OnSerialize((c: StatusPedido) => StatusPedidoEnumMapper.enumParaString(c))
    public readonly status?: StatusPedido;

    @Description("Ids lanches selecionados")
    @Example("[123, 321, 456]")
    @Property()
    public readonly idsLanche: number[];

    @Description("Ids acompanhamentos selecionados")
    @Example("[123, 321, 456]")
    @Property()
    public readonly idsAcompanhamento: number[];

    @Description("Ids bebidas selecionadas")
    @Example("[123, 321, 456]")
    @Property()
    public readonly idsBebida: number[];

    @Description("Ids sobremesas selecionadas")
    @Example("[123, 321, 456]")
    @Property()
    public readonly idsSobremesa: number[];


    static getInstance(pedido: Pedido): PedidoJson  {

        return {
            id: pedido.id,
            observacao: pedido.observacao,
            clienteId: pedido.getCliente()?.id,
            status: pedido.getStatus(),
        } as PedidoJson;
    }

    public getDomain(): Pedido {
        const lanches:Produto[] = this.mapIdToProduto(this.idsLanche, CategoriaEnum.LANCHE);
        const acompanhamentos:Produto[] = this.mapIdToProduto(this.idsAcompanhamento, CategoriaEnum.ACOMPANHAMENTO);
        const bebidas:Produto[] = this.mapIdToProduto(this.idsBebida, CategoriaEnum.BEBIDA);
        const sobremesas:Produto[] = this.mapIdToProduto(this.idsSobremesa, CategoriaEnum.SOBREMESA);

        const itens: Item[] = this.getItens(lanches, acompanhamentos, bebidas, sobremesas);

        let cliente = undefined;
        if(this.clienteId){
            cliente = new Cliente(this.clienteId, undefined, undefined);
        }

        return new Pedido(this.id, undefined, itens, cliente, undefined, this.observacao);
    }

    private getItens(lanches: Produto[], acompanhamentos: Produto[], bebidas: Produto[], sobremesas: Produto[]) {
        const itens: Item[] = [];
        lanches.map(p => new Item(p.id, undefined, p)).forEach(i => itens.push(i));
        acompanhamentos.map(p => new Item(p.id, undefined, p)).forEach(i => itens.push(i));
        bebidas.map(p => new Item(p.id, undefined, p)).forEach(i => itens.push(i));
        sobremesas.map(p => new Item(p.id, undefined, p)).forEach(i => itens.push(i));
        return itens;
    }

    private mapIdToProduto(ids: number[], categoria: CategoriaEnum): Produto[]{
        if(ids === undefined){
            return [];
        }
        return ids.map(id => new Produto(id, undefined, undefined, categoria));
    }
}