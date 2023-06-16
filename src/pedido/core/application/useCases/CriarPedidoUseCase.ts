import { Service, Logger, Inject } from "@tsed/common";
import { Pedido } from "../../domain/Pedido";
import { IPedidoRepositoryGateway } from "../ports/IPedidoRepositoryGateway";
import { PedidoMySqlRepositoryGateway } from "src/pedido/adapter/driven/repositories/PedidoMySqlRepositoryGateway";
import { ObterProdutoUseCase } from "./ObterProdutoUseCase";

@Service()
export class CriarPedidoUseCase {
    
    constructor(
        @Inject(PedidoMySqlRepositoryGateway) private pedidoRepositoryGateway: IPedidoRepositoryGateway,
        @Inject() private obterProdutoUsecase: ObterProdutoUseCase,
        @Inject() private logger: Logger){}

    async criar(pedido: Pedido): Promise<number | undefined> {
        this.logger.trace("Start pedido={}", pedido);

        pedido.itens?.map(i => i.produto)
            .forEach(p => {
                if(p?.id !== undefined){
                    this.obterProdutoUsecase.obterPorId(p.id);
                }
            });
        
        //TODO: adicionar validações se existe os produtos cadastrados e se existe o user (caso não tenha, salvar pedido sem cliente)
        pedido.setStatusNovo();
        const id = await this.pedidoRepositoryGateway.criar(pedido);

        this.logger.trace("End id={}", id);
        return id;
    }
}