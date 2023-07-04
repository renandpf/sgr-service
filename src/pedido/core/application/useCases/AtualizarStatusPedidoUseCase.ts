import { Inject, Logger } from "@tsed/common";
import { Pedido, StatusPedido } from "../../domain";
import { IPedidoRepositoryGateway } from "../ports";
import { Optional } from "typescript-optional";
import { PedidoNotFoundException } from "../exceptions/PedidoNotFoundException";
import { IAtualizarStatusPedidoUseCase } from "./IAtualizarStatusPedidoUseCase";
import { Injectable, ProviderScope, ProviderType } from "@tsed/di";

@Injectable({
    type: ProviderType.SERVICE,
    scope: ProviderScope.REQUEST,
    provide: IAtualizarStatusPedidoUseCase
})
export class AtualizarStatusPedidoUseCase implements IAtualizarStatusPedidoUseCase {
    constructor(
        @Inject(IPedidoRepositoryGateway) private pedidoRepositoryGateway: IPedidoRepositoryGateway,
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