import { PlatformTest } from "@tsed/common";
import { mock } from "jest-mock-extended";
import { IProdutoRepositoryGateway } from "../../ports";
import { anyProduto } from "../../../../../__tests__/databuilder/ProductDatabuilder";
import { CriarProdutoUseCase } from "./CriarProdutoUseCase";

describe("Testes de CriarProduto", () => {
  beforeEach(PlatformTest.create);
  afterEach(PlatformTest.reset);

  
  it("deve criar um novo produto", async () => {
    const newProduto = anyProduto.build();
    const mockedProdutoRepositoryGateway = mock<IProdutoRepositoryGateway>();

    const productId = newProduto.id === undefined ? 1 : newProduto.id;
    mockedProdutoRepositoryGateway.criar.calledWith(newProduto).mockResolvedValue(productId);

    const criarProdutoUseCase = new CriarProdutoUseCase(mockedProdutoRepositoryGateway);

    const newProdutoId = await criarProdutoUseCase.criar(newProduto);
    expect(newProduto.id).toEqual(newProdutoId);
    
    const produtoSentToSave = mockedProdutoRepositoryGateway.criar.mock.calls[0][0];
    expect(newProduto).toEqual(produtoSentToSave);
  });
});
