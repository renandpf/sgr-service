import { Inject, Logger } from "@tsed/common";
import { IProdutoRepositoryGateway } from "../../ports/IProdutoRepositoryGateway";
import { IAlterarProdutoUseCase } from "./IAlterarProdutoUseCase";
import { Injectable, ProviderScope, ProviderType } from "@tsed/di";
import { AlterarProdutoParamsDto } from "src/gerencial/core/dto/produto/flows/AlterarProdutoParamsDto";
import { AlterarProdutoReturnDto } from "src/gerencial/core/dto/produto/flows/AlterarProdutoReturnDto";

@Injectable({
    type: ProviderType.SERVICE,
    scope: ProviderScope.REQUEST,
    provide: IAlterarProdutoUseCase
})
export class AlterarProdutoUseCase implements IAlterarProdutoUseCase {
    constructor( 
        @Inject(IProdutoRepositoryGateway) private produtoRepositoryGateway: IProdutoRepositoryGateway,
        @Inject() private logger: Logger){}

    public async alterar(dto: AlterarProdutoParamsDto): Promise<AlterarProdutoReturnDto> {
        this.logger.trace("Start dto={}", dto);
        await this.produtoRepositoryGateway.alterar(dto.produto);
        const returnDto = new AlterarProdutoReturnDto();
        this.logger.trace("End returnDto={}", returnDto);
        return returnDto;
    }
}