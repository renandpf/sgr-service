import { Inject, Service } from "@tsed/common";
import { PedidoMySqlRepositoryGateway } from "src/pagamento/adapter/driven/repositories/PedidoMySqlRepositoryGateway";
import { IPedidoRepositoryGateway } from "../ports/IPedidoRepositoryGateway";
import { PedidoNotFoundException } from "../exceptions/PedidoNotFoundException";
import { Pedido } from "src/pedido";

@Service()
export class ObterPedidoUseCase {
    constructor( @Inject(PedidoMySqlRepositoryGateway) private pedidoRepositoryGateway: IPedidoRepositoryGateway ){}

    async obterPorId(id: number): Promise<Pedido> {
        //TODO: colocar logs
        const clienteOp = await this.pedidoRepositoryGateway.obterPorId(id);
        if(clienteOp.isEmpty()) {
            throw new PedidoNotFoundException();
        }
        return clienteOp.get();
    }
}