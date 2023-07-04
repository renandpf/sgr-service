import { Inject } from "@tsed/di";
import { IClienteRepositoryGateway } from "../../ports";
import { Service, Logger } from "@tsed/common";
import { ClienteMySqlRepositoryGateway } from "../../../../adapter";
import { ClienteNaoEncontradoException } from "../../exception/ClienteNaoEncontradoException";
import { IAlterarClienteUseCase } from "./IAlterarClienteUseCase";
import { AlterarClienteParamsDto } from "../../../dto/cliente/flows/AlterarClienteParamsDto";
import { AlterarClienteReturnDto } from "../../../dto/cliente/flows/AlterarClienteReturnDto";
import { Cliente } from "../../../domain/Cliente";
import { ClienteDto } from "../../../dto/cliente/ClienteDto";

@Service()
export class AlterarClienteUseCase implements IAlterarClienteUseCase {

    constructor( 
        @Inject(ClienteMySqlRepositoryGateway) private clienteRepositoryGateway: IClienteRepositoryGateway,
        @Inject() private logger: Logger 
     ){}
    
    async alterar(paramsDto: AlterarClienteParamsDto): Promise<AlterarClienteReturnDto> {
        this.logger.trace("Start requestDto={}", paramsDto);

        const cliente = this.mapDtoToDomain(paramsDto.cliente);

        cliente.validar();

        const clienteOp = await this.clienteRepositoryGateway.obterPorCpf(<string>cliente.cpf);
        
        if (clienteOp.isEmpty()) {
            this.logger.warn("Cliente não encontardo!");
            throw new ClienteNaoEncontradoException();
        }
        
        const returnDto = await this.clienteRepositoryGateway.alterar(paramsDto);
        
        this.logger.trace("End returnDto={}", returnDto);
        return returnDto;
    }

    private mapDtoToDomain(dto: ClienteDto): Cliente {
        return new Cliente(dto.id, dto.nome, dto.cpf, dto.email);
    }
}
