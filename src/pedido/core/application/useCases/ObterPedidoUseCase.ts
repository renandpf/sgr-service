import { Service, Logger, Inject } from "@tsed/common";
import { Pedido } from "../../domain/Pedido";
import { IPedidoRepositoryGateway } from "../ports/IPedidoRepositoryGateway";
import { PedidoMySqlRepositoryGateway } from "src/pedido/adapter/driven/repositories/PedidoMySqlRepositoryGateway";
import { PedidoNotFoundException } from "../exceptions/PedidoNotFoundException";
import { StatusPedidoEnumMapper } from "../../domain/StatusPedidoEnumMapper";

@Service()
export class ObterPedidoUseCase {
    
    constructor(
        @Inject(PedidoMySqlRepositoryGateway) private pedidoRepositoryGateway: IPedidoRepositoryGateway,
        @Inject() private logger: Logger){}

    async obterPorId(id: number): Promise<Pedido> {
        this.logger.trace("Start id={}", id);

        const pedidoOp = await this.pedidoRepositoryGateway.obterPorId(id);
        if(pedidoOp.isEmpty()){
            this.logger.warn("Pedido não encontrado. id={}", id);
            throw new PedidoNotFoundException();
        }

        const pedido = pedidoOp.get();
        this.logger.trace("End pedido={}", pedido);
        return pedido;
    }

    async obterEmAndamento(): Promise<Pedido[]> {
        this.logger.trace("Start em andamento");

        const pedidoOp = await this.pedidoRepositoryGateway.obterEmAndamento();
        if(pedidoOp.isEmpty()){
            this.logger.warn("Pedidos não retornados");
            throw new PedidoNotFoundException();
        }

        const pedido = pedidoOp.get();
        this.logger.trace("End em andamento");
        return pedido;
    }

    async obterPorStatus(status: string): Promise<Pedido[]> {
        this.logger.trace(`Solicitando consulta por status: ${status}`);
        const pedidosOp = await this.pedidoRepositoryGateway.obterPorStatus(StatusPedidoEnumMapper.stringParaEnum(status))

        if(pedidosOp.isEmpty()) {
            this.logger.warn(`Pedidos não retornados. Status: ${status}`);
            throw new PedidoNotFoundException();
        }

        this.logger.trace("Solicitação concluída");
        return pedidosOp.get();
    }

}