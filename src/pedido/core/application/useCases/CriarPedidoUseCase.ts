import { Inject, Logger } from "@tsed/common";
import { Pedido, StatusPedido } from "../../domain";
import { IPedidoRepositoryGateway } from "../ports";
import { ProdutoNotFoundException } from "../exceptions/ProdutoNotFoundException";
import { ICriarPedidoUseCase } from "./ICriarPedidoUseCase";
import { Injectable, ProviderScope, ProviderType } from "@tsed/di";
import { IObterClienteUseCase, IObterProdutoUseCase } from "../../../../gerencial";

@Injectable({
  type: ProviderType.SERVICE,
  scope: ProviderScope.REQUEST,
  provide: ICriarPedidoUseCase
})
export class CriarPedidoUseCase implements ICriarPedidoUseCase {

  constructor(
    @Inject(IPedidoRepositoryGateway) private pedidoRepositoryGateway: IPedidoRepositoryGateway,
    @Inject(IObterProdutoUseCase) private obterProdutoUseCase: IObterProdutoUseCase,
    @Inject(IObterClienteUseCase) private obterClienteUseCase: IObterClienteUseCase,
    @Inject() private logger: Logger) { }

  async criar(pedido: Pedido): Promise<Pedido> {
    this.logger.trace("Start pedido={}", pedido);

    pedido.dataCadastro = new Date(Date.now());
    await this.verificaRemoveClienteInexistente(pedido);
    await this.verificaExistenciaProduto(pedido);

    pedido.setStatus(StatusPedido.RECEBIDO);
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

      const produtoOp = await this.obterProdutoUseCase.obterPorId(produto.id as never);
      if (produtoOp == undefined) {
        this.logger.warn("Produto informado não existe. produto.id={}", produto.id)
        throw new ProdutoNotFoundException();
      }

      item.valorUnitario = produtoOp.valor as never;
    }

  }
}