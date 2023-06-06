import { PlatformTest } from "@tsed/common";
import { mock } from "jest-mock-extended";
import { IProdutoRepositoryGateway } from "../../ports";
import { anyProduto } from "../../../../../__tests__/databuilder/ProductDatabuilder";
import { anyNumber } from "../../../../../__tests__/databuilder/PrimitiveDatabuilder";
import { ObterProdutoUseCase } from "./ObterProdutoUseCase";
import { CategoriaEnum } from "../../../domain";

describe("Testes de ObterProduto", () => {
  beforeEach(PlatformTest.create);
  afterEach(PlatformTest.reset);

  
  it("deve obter um produto pelo id", async () => {
    const anyProductId: number = anyNumber.build();
    const produtoExpected = anyProduto.build();
    const mockedProdutoRepositoryGateway = mock<IProdutoRepositoryGateway>();
    mockedProdutoRepositoryGateway.obterPorId.calledWith(anyProductId).mockResolvedValue(produtoExpected);

    const obterProdutoUseCase = new ObterProdutoUseCase(mockedProdutoRepositoryGateway);

    const produtoFound = await obterProdutoUseCase.obterPorId(anyProductId);

    expect(produtoExpected).toEqual(produtoFound);
  });

  it("deve obter todos produtos a partir de uma categoria", async () => {
    const anyCategoria = CategoriaEnum.ACOMPANHAMENTO;
    const anyProdutoA = anyProduto.build();
    const anyProdutoB = anyProduto.build();
    const produtosExistents = [anyProdutoA, anyProdutoB];

    const mockedProdutoRepositoryGateway = mock<IProdutoRepositoryGateway>();
    mockedProdutoRepositoryGateway.obterPorCategoria.calledWith(anyCategoria).mockResolvedValue(produtosExistents);

    const obterProdutoUseCase = new ObterProdutoUseCase(mockedProdutoRepositoryGateway);

    const produtosFound = await obterProdutoUseCase.obterPorCategoria(anyCategoria);

    expect(produtosExistents).toEqual(produtosFound);
  });

});
