import { Inject } from "@tsed/di";
import { IClienteRepositoryGateway } from "../../ports";
import { Service, Logger } from "@tsed/common";
import { ClienteMySqlRepositoryGateway } from "../../../../adapter";
import { Optional } from "typescript-optional";
import { ClienteNaoEncontradoException } from "../../exception/ClienteNaoEncontradoException";
import { IAlterarClienteUseCase } from "./IAlterarClienteUseCase";
import { AlterarClienteParamsDto } from "../../../dto/cliente/flows/AlterarClienteParamsDto";
import { AlterarClienteResponseDto } from "../../../dto/cliente/flows/AlterarClienteReturnDto";
import { Cliente } from "../../../domain/Cliente";
import { ClienteDto } from "../../../dto/cliente/ClienteDto";

@Service()
export class AlterarClienteUseCase implements IAlterarClienteUseCase {

    constructor( 
        @Inject(ClienteMySqlRepositoryGateway) private clienteRepositoryGateway: IClienteRepositoryGateway,
        @Inject() private logger: Logger 
     ){}
    
    async alterar(requestDto: AlterarClienteParamsDto): Promise<AlterarClienteResponseDto> {
        this.logger.trace("Start requestDto={}", requestDto);

        const cliente = this.mapDtoToDomain(requestDto.cliente);

        cliente.validar();

        const clienteOp: Optional<Cliente> = await this.clienteRepositoryGateway.obterPorCpf(<string>cliente.cpf);
        
        if (clienteOp.isEmpty()) {
            throw new ClienteNaoEncontradoException();
        }
        
        const clienteAlterado = clienteOp.get().set(cliente);

        await this.clienteRepositoryGateway.alterar(clienteAlterado);
        const responseDto = new AlterarClienteResponseDto();
        this.logger.trace("End responseDto={}", responseDto);
        return responseDto;
    }

    private mapDtoToDomain(dto: ClienteDto): Cliente {
        return new Cliente(dto.id, dto.nome, dto.cpf, dto.email);
    }
}
