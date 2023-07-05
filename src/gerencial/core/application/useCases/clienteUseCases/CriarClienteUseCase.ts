import { Inject, Injectable, ProviderScope, ProviderType } from "@tsed/di";
import { IClienteRepositoryGateway } from "../../ports";
import { Cliente } from "../../../domain/Cliente";
import { Logger } from "@tsed/common";
import { ClienteExistenteException } from "../../exception/ClienteExistenteException";
import { ICriarClienteUseCase } from "../../ports/ICriarClienteUseCase";
import { CriarClienteParamsDto } from "../../../dto/cliente/flows/CriarClienteParamsDto";
import { CriarClienteReturnDto } from "../../../dto/cliente/flows/CriarClienteReturnDto";
import { ClienteDto } from "../../../dto/cliente/ClienteDto";

@Injectable({
    type: ProviderType.SERVICE,
    scope: ProviderScope.REQUEST,
    provide: ICriarClienteUseCase
})
export class CriarClienteUseCase implements ICriarClienteUseCase {

    constructor( 
        @Inject(IClienteRepositoryGateway) private clienteRepositoryGateway: IClienteRepositoryGateway,
        @Inject() private logger: Logger  ){}
    async criar(dto: CriarClienteParamsDto): Promise<CriarClienteReturnDto> {
        this.logger.trace("Start dto={}", dto);

        const clienteReq = this.mapDtoToDomain(dto.cliente);

        clienteReq.validar();

        const clienteOp = await this.clienteRepositoryGateway.obterPorCpf(<string>clienteReq.cpf);

        if (!clienteOp.isEmpty()) {
            this.logger.warn("Cliente já existe no sistema.")
            throw new ClienteExistenteException();
        }

        const returnDto = await this.clienteRepositoryGateway.criar(dto);

        this.logger.trace("End returnDto={}", returnDto);
        return returnDto;
    }

    private mapDtoToDomain(dto: ClienteDto): Cliente {
        return new Cliente(dto.id, dto.nome, dto.cpf, dto.email);
    }

}