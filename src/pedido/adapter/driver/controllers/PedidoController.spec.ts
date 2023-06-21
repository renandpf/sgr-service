import { PlatformTest, Logger } from "@tsed/common";
import { mock } from "jest-mock-extended";
import { anyPedidoJson } from "../../../../__tests__/databuilder/PedidoDatabuilder";
import { PedidoJson } from "./json/PedidoJson";
import { CriarPedidoUseCase } from "../../../core/application/useCases/CriarPedidoUseCase";
import { PedidoController } from "./PedidoController";
import { AtualizarStatusPedidoUseCase } from "../../../core/application/useCases/AtualizarStatusPedidoUseCase";
import { ObterPedidoUseCase } from "src/pedido/core/application/useCases/ObterPedidoUseCase";

const mockedLogger = mock<Logger>();

describe("Testes de Pedido Controller", () => {
  beforeEach(PlatformTest.create);
  afterEach(PlatformTest.reset);


  it.skip("deve criar um novo pedido contendo todos os dados", async () => {
    const newPedidoJson = anyPedidoJson as PedidoJson;
    const mockedObterPedidoUseCase = mock<ObterPedidoUseCase>();
    const mockedCriarPedidoUseCase = mock<CriarPedidoUseCase>();
    const mockedAtualizarStatusPedidoUseCase = mock<AtualizarStatusPedidoUseCase>();

    //mockedProdutoRepositoryGateway.criar.calledWith(newProduto).mockResolvedValue(productId);

    const pedidoController = new PedidoController(mockedObterPedidoUseCase, mockedCriarPedidoUseCase, mockedAtualizarStatusPedidoUseCase, mockedLogger);

    const newProdutoId = await pedidoController.criar(newPedidoJson);
    // expect(newProduto.id).toEqual(newProdutoId);

    // const produtoSentToSave = mockedProdutoRepositoryGateway.criar.mock.calls[0][0];
    // expect(newProduto).toEqual(produtoSentToSave);
  });
});
