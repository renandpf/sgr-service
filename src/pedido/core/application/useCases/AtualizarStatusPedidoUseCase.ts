import { Inject, Logger } from "@tsed/common";
import { Pedido, StatusPedido } from "../../domain";
import { IPedidoRepositoryGateway } from "../ports";
import { Optional } from "typescript-optional";
import { PedidoNotFoundException } from "../exceptions/PedidoNotFoundException";
import { IAtualizarStatusPedidoUseCase } from "../ports/IAtualizarStatusPedidoUseCase";
import { Injectable, ProviderScope, ProviderType } from "@tsed/di";
import { PedidoDto } from "../../dtos/PedidoDto";

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
        const pedidoOp: Optional<PedidoDto> = await this.pedidoRepositoryGateway.obterPorId(pedidoId);
        if (pedidoOp.isEmpty()) {
            this.logger.warn("Pedido id={} não encontrado", pedidoId);
            throw new PedidoNotFoundException();
        }
        const pedidoDto = pedidoOp.get();
        const pedido = Pedido.getInstance(pedidoDto);
        pedido.setStatus(status);
        await this.pedidoRepositoryGateway.atualizarStatus(pedido.toPedidoDto());
        this.logger.trace("End");
    }
}