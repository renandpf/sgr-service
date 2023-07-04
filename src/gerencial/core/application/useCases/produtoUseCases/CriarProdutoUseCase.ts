import { Inject, Logger } from "@tsed/common";
import { IProdutoRepositoryGateway } from "../../ports/IProdutoRepositoryGateway";
import { ICriarProdutoUseCase } from "./ICriarProdutoUseCase";
import { Injectable, ProviderScope, ProviderType } from "@tsed/di";
import { CriarProdutoParamsDto } from "../../../dto/produto/flows/CriarProdutoParamsDto";
import { CriarProdutoReturnDto } from "../../../dto/produto/flows/CriarProdutoReturnDto";
import { ProdutoDto } from "src/gerencial/core/dto/produto/ProdutoDto";
import { ProdutoValidacaoException } from "../../exception/ProdutoValidacaoException";

@Injectable({
    type: ProviderType.SERVICE,
    scope: ProviderScope.REQUEST,
    provide: ICriarProdutoUseCase
})
export class CriarProdutoUseCase implements ICriarProdutoUseCase {
    constructor( 
        @Inject(IProdutoRepositoryGateway) private produtoRepositoryGateway: IProdutoRepositoryGateway,
        @Inject() private logger: Logger,
     ){}

    public async criar(dto: CriarProdutoParamsDto): Promise<CriarProdutoReturnDto> {
        this.logger.trace("Start dto={}", dto);

        this.validar(dto.produto);

        const id = await this.produtoRepositoryGateway.criar(dto.produto);
        const returnDto = new CriarProdutoReturnDto(id);
        this.logger.trace("End returnDto={}", returnDto);
        return returnDto;
    }

    validar(produtoDto: ProdutoDto){
        if(!produtoDto.nome){
            this.logger.warn("Nome é obrigatório");
            throw new ProdutoValidacaoException("Nome é obrigatório");
        }else if(!produtoDto.valor){
            this.logger.warn("Valor é obrigatório");
            throw new ProdutoValidacaoException("Valor é obrigatório");
        }
        else if(!produtoDto.categoriaId === undefined){
            this.logger.warn("Categoria é obrigatória");
            throw new ProdutoValidacaoException("Categoria é obrigatória");
        }
    }
}