import { Service, Logger, Inject } from "@tsed/common";
import { Pedido } from "../../domain/Pedido";
import { IPedidoRepositoryGateway } from "../ports/IPedidoRepositoryGateway";
import { PedidoMySqlRepositoryGateway } from "src/pedido/adapter/driven/repositories/PedidoMySqlRepositoryGateway";

@Service()
export class CriarPedidoUseCase {
    
    constructor(
        @Inject(PedidoMySqlRepositoryGateway) private pedidoRepositoryGateway: IPedidoRepositoryGateway,
        @Inject() private logger: Logger){}

    async criar(pedido: Pedido): Promise<number | undefined> {
        this.logger.trace("Start pedido={}", pedido);

        //TODO: chamar sistema de pagamento!!

        const id = await this.pedidoRepositoryGateway.criar(pedido);

        this.logger.trace("End id={}", id);
        return id;
    }
}