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

    const excluirProdutoUseCase = new ExcluirProdutoUseCase(mockedProdutoRepositoryGateway);

    await excluirProdutoUseCase.excluir(anyProdutoId);

    const produtoSentToExclude = mockedProdutoRepositoryGateway.excluir.mock.calls[0][0];
    expect(anyProdutoId).toEqual(produtoSentToExclude);
  });
});
