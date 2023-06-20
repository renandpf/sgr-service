import { Service, Logger, Inject } from "@tsed/common";
import { Pedido } from "../../domain/Pedido";
import { IPedidoRepositoryGateway } from "../ports/IPedidoRepositoryGateway";
import { PedidoMySqlRepositoryGateway } from "src/pedido/adapter/driven/repositories/PedidoMySqlRepositoryGateway";
import { IClienteServiceGateway } from "../ports/IClienteServiceGateway";
import { IProdutoServiceGateway } from "../ports/IProdutoServiceGateway";
import { ClienteServiceHttpGateway } from "src/pedido/adapter/driven/http/ClienteServiceHttpGateway";
import { ProdutoServiceHttpGateway } from "src/pedido/adapter/driven/http/ProdutoServiceHttpGateway";
import { ProdutoNotFoundException } from "../exceptions/ProdutoNotFoundException";

@Service()
export class CriarPedidoUseCase {
    
    constructor(
        @Inject(PedidoMySqlRepositoryGateway) private pedidoRepositoryGateway: IPedidoRepositoryGateway,
        @Inject(ClienteServiceHttpGateway) private clienteServiceGateway: IClienteServiceGateway,
        @Inject(ProdutoServiceHttpGateway) private produtoServiceGateway: IProdutoServiceGateway,
        @Inject() private logger: Logger){}

    async criar(pedido: Pedido): Promise<number | undefined> {
        this.logger.trace("Start pedido={}", pedido);

        pedido.inicializar();
        await this.verificaExistenciaProduto(pedido);
        await this.verificaRemoveClienteInexistente(pedido);

        //TODO: adicionar regra: validar se cada produto informado é da categoria certa
        
        pedido.setStatusNovo();
        const id = await this.pedidoRepositoryGateway.criar(pedido);

        this.logger.trace("End id={}", id);
        return id;
    }

    private async verificaRemoveClienteInexistente(pedido: Pedido) {
        const clienteId = pedido.getCliente()?.id;
        if (clienteId !== undefined) {
            const prodOp = await this.clienteServiceGateway.obterPorId(clienteId);
            if(prodOp.isEmpty()){
                pedido.removerCliente();
            }
        }
    }

    private async verificaExistenciaProduto(pedido: Pedido) {
        if(pedido.itens !== undefined){
            for (let i = 0; i < pedido.itens.length; ++i) {
                const item = pedido.itens[i];
                const produto = item.produto;

                if(produto !== undefined && produto.id != undefined) {
                    const produtoOp = await this.produtoServiceGateway.obterPorId(produto.id);
                    if (produtoOp.isEmpty()) {
                        this.logger.warn("Produto informado não existe. produto.id={}", produto.id)
                        throw new ProdutoNotFoundException();
                    }
                }
            }
        }
    }
}