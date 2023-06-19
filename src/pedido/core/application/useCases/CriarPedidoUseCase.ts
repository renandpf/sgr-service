import { Service, Logger, Inject } from "@tsed/common";
import { Pedido } from "../../domain/Pedido";
import { IPedidoRepositoryGateway } from "../ports/IPedidoRepositoryGateway";
import { PedidoMySqlRepositoryGateway } from "src/pedido/adapter/driven/repositories/PedidoMySqlRepositoryGateway";
import { IClienteServiceGateway } from "../ports/IClienteServiceGateway";
import { IProdutoServiceGateway } from "../ports/IProdutoServiceGateway";
import { ClienteServiceHttpGateway } from "src/pedido/adapter/driven/http/ClienteServiceHttpGateway";
import { ProdutoServiceHttpGateway } from "src/pedido/adapter/driven/http/ProdutoServiceHttpGateway";

@Service()
export class CriarPedidoUseCase {
    
    constructor(
        @Inject(PedidoMySqlRepositoryGateway) private pedidoRepositoryGateway: IPedidoRepositoryGateway,
        @Inject(ClienteServiceHttpGateway) private clienteServiceGateway: IClienteServiceGateway,
        @Inject(ProdutoServiceHttpGateway) private produtoServiceGateway: IProdutoServiceGateway,
        @Inject() private logger: Logger){}

    async criar(pedido: Pedido): Promise<number | undefined> {
        this.logger.trace("Start pedido={}", pedido);

        await this.verificaExistenciaProduto(pedido);
        await this.verificaRemoveClienteInexistente(pedido);
        
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
        pedido.itens?.map(i => i.produto)
            .forEach(async p => {
                if (p?.id !== undefined) {
                    const produtoOp = await this.produtoServiceGateway.obterPorId(p.id);
                    if(produtoOp.isEmpty()){
                        //throw new ProdutoNotFoundException();
                    }
                }
            });
    }
}