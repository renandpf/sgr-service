import { PlatformTest, Logger } from "@tsed/common";
import { mock } from "jest-mock-extended";
import { IProdutoRepositoryGateway } from "../../ports";
import { anyProduto } from "../../../../../__tests__/databuilder/ProductDatabuilder";
import { AlterarProdutoUseCase } from "./AlterarProdutoUseCase";

const mockedLogger = mock<Logger>();

describe("Testes de Alterar Produto", () => {
  beforeEach(PlatformTest.create);
  afterEach(PlatformTest.reset);

  
  it("deve alterar um produto existente", async () => {
    const changedProduto = anyProduto.build();
    const mockedProdutoRepositoryGateway = mock<IProdutoRepositoryGateway>();
    mockedProdutoRepositoryGateway.alterar.calledWith(changedProduto).mockResolvedValue();
    
    const alterarProdutoUseCase = new AlterarProdutoUseCase(mockedProdutoRepositoryGateway, mockedLogger);

    await alterarProdutoUseCase.alterar(changedProduto);
    
    const produtoSentToSave = mockedProdutoRepositoryGateway.alterar.mock.calls[0][0];
    expect(changedProduto).toEqual(produtoSentToSave);
  });
});
