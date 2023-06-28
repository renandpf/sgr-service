import { Inject, Logger, Service } from "@tsed/common";
import { Pedido } from "../../domain/Pedido";
import { IPedidoRepositoryGateway } from "../ports/IPedidoRepositoryGateway";
import { PedidoMySqlRepositoryGateway } from "../../../../pedido/adapter/driven/repositories/PedidoMySqlRepositoryGateway";
import { IClienteServiceGateway } from "../ports/IClienteServiceGateway";
import { IProdutoServiceGateway } from "../ports/IProdutoServiceGateway";
import { ClienteServiceHttpGateway } from "../../../../pedido/adapter/driven/http/ClienteServiceHttpGateway";
import { ProdutoServiceHttpGateway } from "../../../../pedido/adapter/driven/http/ProdutoServiceHttpGateway";
import { ProdutoNotFoundException } from "../exceptions/ProdutoNotFoundException";
import { StatusPedido } from "../../domain/StatusPedido";
import {
  ObterProdutoUseCase
} from "../../../../gerencial/core/application/useCases/produtoUseCases/ObterProdutoUseCase";
import { ObterClienteUseCase } from "../../../../gerencial";

@Service()
export class CriarPedidoUseCase {

  constructor(
    @Inject(PedidoMySqlRepositoryGateway) private pedidoRepositoryGateway: IPedidoRepositoryGateway,
    @Inject(ClienteServiceHttpGateway) private clienteServiceGateway: IClienteServiceGateway,
    @Inject(ProdutoServiceHttpGateway) private produtoServiceGateway: IProdutoServiceGateway,
    @Inject() private obterProdutoUseCase: ObterProdutoUseCase,
    @Inject() private obterClienteUseCase: ObterClienteUseCase,
    @Inject() private logger: Logger) { }

  async criar(pedido: Pedido): Promise<Pedido> {
    this.logger.trace("Start pedido={}", pedido);

    pedido.dataCadastro = new Date(Date.now());
    await this.verificaRemoveClienteInexistente(pedido);
    await this.verificaExistenciaProduto(pedido);

    pedido.setStatus(StatusPedido.AGUARDANDO_PAGAMENTO);
    const id = await this.pedidoRepositoryGateway.criar(pedido);
    if (id !== undefined) {
      pedido.id = id;
    }
    this.logger.trace("End id={}", id);
    return pedido;
  }

  private async verificaRemoveClienteInexistente(pedido: Pedido) {
    const clienteId = pedido.cliente?.id;
    if (clienteId !== undefined) {
      // const cliOp = await this.clienteServiceGateway.obterPorId(clienteId);
      // if(cliOp.isEmpty()){

      const cliOp = await this.obterClienteUseCase.obterPorId(clienteId);
      if (cliOp == undefined) {
        pedido.removerCliente();
      }
    }
  }

  private async verificaExistenciaProduto(pedido: Pedido) {

    if (pedido.itens === undefined || pedido.itens.length === 0) {
      throw new ProdutoNotFoundException();
    }

    for (let i = 0; i < pedido.itens.length; ++i) {
      const item = pedido.itens[i];
      const produto = item.produto;

      if (produto === undefined) {
        throw new ProdutoNotFoundException();
      }

      // const produtoOp = await this.produtoServiceGateway.obterPorId(produto.id);
      // if (produtoOp.isEmpty()) {
      const produtoOp = await this.obterProdutoUseCase.obterPorId(produto.id as never);
      if (produtoOp == undefined) {
        this.logger.warn("Produto informado não existe. produto.id={}", produto.id)
        throw new ProdutoNotFoundException();
      }

      item.valorUnitario = produtoOp.valor as never;
    }

  }
}