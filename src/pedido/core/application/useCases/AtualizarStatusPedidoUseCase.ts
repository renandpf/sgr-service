import { Service, Logger, Inject } from "@tsed/common";
import { Pedido } from "../../domain/Pedido";
import { IPedidoRepositoryGateway } from "../ports/IPedidoRepositoryGateway";
import { PedidoMySqlRepositoryGateway } from "src/pedido/adapter/driven/repositories/PedidoMySqlRepositoryGateway";
import { Optional } from "typescript-optional";
import { PedidoNotFoundException } from "../exceptions/PedidoNotFoundException";
import { StatusPedido } from "../../domain/StatusPedido";

@Service()
export class AtualizarStatusPedidoUseCase {
    constructor(
        @Inject(PedidoMySqlRepositoryGateway) private pedidoRepositoryGateway: IPedidoRepositoryGateway,
        @Inject() private logger: Logger) { }

    async atualizarStatus(pedidoId: number, status: StatusPedido): Promise<void> {
        this.logger.trace("Start id={}", pedidoId);
        const pedido: Optional<Pedido> = await this.pedidoRepositoryGateway.obterPorId(pedidoId);
        if (pedido.isEmpty()) {
            this.logger.warn("Pedido id={} não encontrado", pedidoId);
            throw new PedidoNotFoundException();
        }
        const pedidoEncontrado = pedido.get();
        
        pedidoEncontrado.setStatus(status);
        await this.pedidoRepositoryGateway.atualizarStatus(pedidoEncontrado);
        this.logger.trace("End");
    }
}