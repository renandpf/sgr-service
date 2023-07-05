import { Inject, Logger } from "@tsed/common";
import { Pedido, PedidoItem, StatusPedido } from "../../domain";
import { IPedidoRepositoryGateway } from "../ports";
import { ProdutoNotFoundException } from "../exceptions/ProdutoNotFoundException";
import { ICriarPedidoUseCase } from "../ports/ICriarPedidoUseCase";
import { Injectable, ProviderScope, ProviderType } from "@tsed/di";
import { Cliente, IObterClienteUseCase, IObterProdutoUseCase, Produto } from "../../../../gerencial";
import { PedidoCadastroDto, PedidoConsultaDto } from "../../dtos";

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

  async criar(pedidoDto: PedidoCadastroDto): Promise<PedidoConsultaDto> {
    this.logger.trace("Start pedido={}", pedidoDto);

    //TODO adicionar mapper
    const pedido = this.dtoToDomain(pedidoDto);

    await this.verificaRemoveClienteInexistente(pedido);
    await this.verificaExistenciaProduto(pedido);

    pedido.dataCadastro = new Date(Date.now());
    pedido.setStatus(StatusPedido.RECEBIDO);

    const id = await this.pedidoRepositoryGateway.criar(pedido.toPedidoDto());
    if (id !== undefined) {
      pedido.id = id;
    }
    this.logger.trace("End id={}", id);
    return PedidoConsultaDto.getInstance(pedido.toPedidoDto());
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

  private dtoToDomain(pedidoDto: PedidoCadastroDto): Pedido{
    let cliente = undefined;
    if (pedidoDto.clienteId) {
      cliente = new Cliente(pedidoDto.clienteId);
    }

    const pedido = new Pedido(undefined, cliente, pedidoDto.observacao);

    pedido.itens = pedidoDto.itens.map(i => {
      return new PedidoItem(undefined, pedido, new Produto(i.produtoId), i.quantidade);
    });

    return pedido;
  }
}