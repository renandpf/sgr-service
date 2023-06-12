import { PlatformTest } from "@tsed/common";
import { mock } from "jest-mock-extended";
import { IProdutoRepositoryGateway } from "../../ports";
import { ExcluirProdutoUseCase } from "./ExcluirProdutoUseCase";
import { anyNumber } from "../../../../../__tests__/databuilder/PrimitiveDatabuilder";

describe("Testes de Excluir Produto", () => {
  beforeEach(PlatformTest.create);
  afterEach(PlatformTest.reset);


  it("deve excluir um produto existente", async () => {
    const anyProdutoId: number = anyNumber.build();
    const mockedProdutoRepositoryGateway = mock<IProdutoRepositoryGateway>();
    mockedProdutoRepositoryGateway.existePedidoByProdutoId.calledWith(anyProdutoId).mockResolvedValue(false);

    const excluirProdutoUseCase = new ExcluirProdutoUseCase(mockedProdutoRepositoryGateway);

    await excluirProdutoUseCase.excluir(anyProdutoId);

    const produtoSentToExclude = mockedProdutoRepositoryGateway.excluir.mock.calls[0][0];
    expect(anyProdutoId).toEqual(produtoSentToExclude);
  });

  it("não deve excluir um produto existente, pois está associado a um pedido", async () => {
    const anyProdutoId: number = anyNumber.build();
    const mockedProdutoRepositoryGateway = mock<IProdutoRepositoryGateway>();
    mockedProdutoRepositoryGateway.existePedidoByProdutoId.calledWith(anyProdutoId).mockResolvedValue(true);

    const excluirProdutoUseCase = new ExcluirProdutoUseCase(mockedProdutoRepositoryGateway);

    
    try {
      await excluirProdutoUseCase.excluir(anyProdutoId);
      expect(false).toEqual(true);//Se chegar aqui é pq tem um bug 
    } catch (e) {
      //console.log(e);
      expect(e.code).toEqual("sgr.exclusionProductAssociatedWithOrder");
    }
    
    //FIXME: essa é maneira correta de testar
    // const t = () => {
    //   throw obterProdutoUseCase.obterPorId(anyProductId);
    // };
    //expect(t).toThrow(Promise);
    //expect(t).toThrow(ProdutoNotFoundException);


  });

});
