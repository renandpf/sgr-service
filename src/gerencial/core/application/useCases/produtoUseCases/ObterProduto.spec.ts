import { PlatformTest } from "@tsed/common";
import { mock } from "jest-mock-extended";
import { IProdutoRepositoryGateway } from "../../ports/ProdutoRepositoryGateway";
import { anyProduto } from "../../../../../__tests__/databuilder/ProductDatabuilder";
import { anyNumber } from "../../../../../__tests__/databuilder/PrimitiveDatabuilder";
import { ObterProdutoUseCase } from "./ObterProduto";

describe("Testes de ObterProduto", () => {
  beforeEach(PlatformTest.create);
  afterEach(PlatformTest.reset);

  const anyProductId: number = anyNumber.build();
  const produtoExpected = anyProduto.build();
  
  it("deve obter um produto pelo id", async () => {
    const mockedProdutoRepositoryGateway = mock<IProdutoRepositoryGateway>();
    mockedProdutoRepositoryGateway.obterById.calledWith(anyProductId).mockResolvedValue(produtoExpected);

    const obterProdutoUseCase = new ObterProdutoUseCase(mockedProdutoRepositoryGateway);

    const produtoFound = await obterProdutoUseCase.obterPorId(anyProductId);

    expect(produtoExpected).toEqual(produtoFound);
  });
});
