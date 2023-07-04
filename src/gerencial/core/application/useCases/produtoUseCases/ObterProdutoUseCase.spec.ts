import { Logger, PlatformTest } from "@tsed/common";
import { mock } from "jest-mock-extended";
import { IProdutoRepositoryGateway } from "../../ports/IProdutoRepositoryGateway";
import { anyProduto } from "../../../../../__tests__/databuilder/ProductDatabuilder";
import { anyNumber } from "../../../../../__tests__/databuilder/PrimitiveDatabuilder";
import { ObterProdutoUseCase } from "./ObterProdutoUseCase";
import { CategoriaEnum, Produto } from "../../../domain";
import { Optional } from "typescript-optional";

const mockedLogger = mock<Logger>();

describe("Testes de ObterProduto", () => {
  beforeEach(PlatformTest.create);
  afterEach(PlatformTest.reset);


  it("deve obter um produto pelo id", async () => {
    const anyProductId: number = anyNumber.build();
    const produtoExpectedOp = Optional.of(anyProduto.build());
    const mockedProdutoRepositoryGateway = mock<IProdutoRepositoryGateway>();
    mockedProdutoRepositoryGateway.obterPorId.calledWith(anyProductId).mockResolvedValue(produtoExpectedOp);

    const obterProdutoUseCase = new ObterProdutoUseCase(mockedProdutoRepositoryGateway, mockedLogger);

    const produtoFound = await obterProdutoUseCase.obterPorId(anyProductId);

    expect(produtoExpectedOp.get()).toEqual(produtoFound);
  });

  it.skip("deve receber erro ao buscar um produto pelo id que não existe", async () => {
    const anyProductId: number = anyNumber.build();
    const produtoExpectedOp: Optional<Produto> = Optional.empty();
    const mockedProdutoRepositoryGateway = mock<IProdutoRepositoryGateway>();
    mockedProdutoRepositoryGateway.obterPorId.calledWith(anyProductId).mockResolvedValue(produtoExpectedOp);

    const obterProdutoUseCase = new ObterProdutoUseCase(mockedProdutoRepositoryGateway, mockedLogger);

    try {
      await obterProdutoUseCase.obterPorId(anyProductId);
      expect(false).toEqual(true);//Se chegar aqui é pq tem um bug 
    } catch (e) {
      //console.log(e);
      expect(e.code).toEqual("sgr.produtoNotFound");
    }

    //FIXME: essa é maneira correta de testar
    // const t = () => {
    //   throw obterProdutoUseCase.obterPorId(anyProductId);
    // };
    //expect(t).toThrow(Promise);
    //expect(t).toThrow(ProdutoNotFoundException);
  });


  it("deve obter todos produtos a partir de uma categoria", async () => {
    const anyCategoria = CategoriaEnum.ACOMPANHAMENTO;
    const anyProdutoA = anyProduto.build();
    const anyProdutoB = anyProduto.build();
    const produtosExistents = [anyProdutoA, anyProdutoB];

    const mockedProdutoRepositoryGateway = mock<IProdutoRepositoryGateway>();
    mockedProdutoRepositoryGateway.obterPorCategoria.calledWith(anyCategoria).mockResolvedValue(produtosExistents);

    const obterProdutoUseCase = new ObterProdutoUseCase(mockedProdutoRepositoryGateway, mockedLogger);

    const produtosFound = await obterProdutoUseCase.obterPorCategoria("BEBIDA");

    expect(produtosExistents).toEqual(produtosFound);
  });

});
