import { PlatformTest } from "@tsed/common";
import { mock } from "jest-mock-extended";
import { IProdutoRepositoryGateway } from "../../ports/ProdutoRepositoryGateway";
import { anyProduto } from "../../../../../__tests__/databuilder/ProductDatabuilder";

describe("Testes de ObterProduto", () => {
  beforeEach(PlatformTest.create);
  afterEach(PlatformTest.reset);

  const anyProductId = 10;
  const produtoExpected = anyProduto.build();
  
  it("deve obter um produto pelo id", () => {
    const mockedProdutoRepositoryGateway = mock<IProdutoRepositoryGateway>();
    mockedProdutoRepositoryGateway.obterById.calledWith(anyProductId).mockResolvedValue(produtoExpected);

  });
});
