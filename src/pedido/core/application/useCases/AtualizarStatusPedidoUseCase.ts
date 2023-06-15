import { Service, Logger, Inject } from "@tsed/common";
import { Pedido } from "../../domain/Pedido";
import { IPedidoRepositoryGateway } from "../ports/IPedidoRepositoryGateway";
import { PedidoMySqlRepositoryGateway } from "src/pedido/adapter/driven/repositories/PedidoMySqlRepositoryGateway";
import { Optional } from "typescript-optional";
import { PedidoNotFoundException } from "../exceptions/PedidoNotFoundException";

@Service()
export class AtualizarStatusPedidoUseCase {
    constructor(
        @Inject(PedidoMySqlRepositoryGateway) private pedidoRepositoryGateway: IPedidoRepositoryGateway,
        @Inject() private logger: Logger) { }

    async atualizarStatusPreparando(pedidoId: number): Promise<void> {
        this.logger.trace("Start id={}", pedidoId);
        const pedido: Optional<Pedido> = await this.pedidoRepositoryGateway.obterPorId(pedidoId);
        if (pedido) {
            this.logger.warn("Pedido id={} não encontrado", pedidoId);
            throw new PedidoNotFoundException();
        }
        const id = await this.pedidoRepositoryGateway.alterar(pedido);
        this.logger.trace("End id={}", id);
    }
}