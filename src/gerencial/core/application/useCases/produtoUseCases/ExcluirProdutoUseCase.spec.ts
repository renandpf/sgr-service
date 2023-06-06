import { PlatformTest } from "@tsed/common";
import { mock } from "jest-mock-extended";
import { IProdutoRepositoryGateway } from "../../ports";
import { anyProduto } from "../../../../../__tests__/databuilder/ProductDatabuilder";
import { ExcluirProdutoUseCase } from "./ExcluirProdutoUseCase";

describe("Testes de Excluir Produto", () => {
  beforeEach(PlatformTest.create);
  afterEach(PlatformTest.reset);


  it("deve excluir um produto existente", async () => {
    const excludedProduto = anyProduto.build();
    const mockedProdutoRepositoryGateway = mock<IProdutoRepositoryGateway>();
    mockedProdutoRepositoryGateway.alterar.calledWith(excludedProduto).mockResolvedValue();

    const excluirProdutoUseCase = new ExcluirProdutoUseCase(mockedProdutoRepositoryGateway);

    await excluirProdutoUseCase.excluir(excludedProduto);

    const produtoSentToExclude = mockedProdutoRepositoryGateway.excluir.mock.calls[0][0];
    expect(excludedProduto).toEqual(produtoSentToExclude);
  });
});
