import { Service, Logger, Inject } from "@tsed/common";
import { Pedido } from "../../domain/Pedido";
import { IPedidoRepositoryGateway } from "../ports/IPedidoRepositoryGateway";
import { PedidoMySqlRepositoryGateway } from "src/pedido/adapter/driven/repositories/PedidoMySqlRepositoryGateway";
import { ObterProdutoUseCase } from "./ObterProdutoUseCase";
import { ObterClienteUseCase } from "./ObterClienteUseCase";
import { ClienteNaoEncontradoException } from "../exceptions/ClienteNaoEncontradoException";

@Service()
export class CriarPedidoUseCase {
    
    constructor(
        @Inject(PedidoMySqlRepositoryGateway) private pedidoRepositoryGateway: IPedidoRepositoryGateway,
        @Inject() private obterProdutoUsecase: ObterProdutoUseCase,
        @Inject() private obterClienteUseCase: ObterClienteUseCase,
        @Inject() private logger: Logger){}

    async criar(pedido: Pedido): Promise<number | undefined> {
        this.logger.trace("Start pedido={}", pedido);

        this.verificaExistenciaProduto(pedido);
        this.verificaRemoveClienteInexistente(pedido);
        
        pedido.setStatusNovo();
        const id = await this.pedidoRepositoryGateway.criar(pedido);

        this.logger.trace("End id={}", id);
        return id;
    }

    private verificaRemoveClienteInexistente(pedido: Pedido) {
        const clienteId = pedido.getCliente()?.id;
        if (clienteId !== undefined) {
            try {
                this.obterClienteUseCase.obterPorId(clienteId);

            } catch (e) {
                if (e instanceof ClienteNaoEncontradoException) {
                    pedido.removerCliente();
                } else {
                    throw e;
                }
            }
        }
    }

    private verificaExistenciaProduto(pedido: Pedido) {
        pedido.itens?.map(i => i.produto)
            .forEach(p => {
                if (p?.id !== undefined) {
                    this.obterProdutoUsecase.obterPorId(p.id);
                }
            });
    }
}