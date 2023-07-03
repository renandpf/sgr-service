import { Inject } from "@tsed/di";
import { IClienteRepositoryGateway } from "../../ports";
import { Cliente } from "../../../domain/Cliente";
import { Service, Logger } from "@tsed/common";
import { ClienteMySqlRepositoryGateway } from "../../../../adapter";
import { Optional } from "typescript-optional";
import { ClienteExistenteException } from "../../exception/ClienteExistenteException";
import { ICriarClienteUseCase } from "./ICriarClienteUseCase";
import { CriarClienteParamsDto } from "../../../dto/cliente/flows/CriarClienteParamsDto";
import { CriarClienteReturnDto } from "../../../dto/cliente/flows/CriarClienteReturnDto";
import { ClienteDto } from "../../../dto/cliente/ClienteDto";


@Service()
export class CriarClienteUseCase implements ICriarClienteUseCase {

    constructor( 
        @Inject(ClienteMySqlRepositoryGateway) private clienteRepositoryGateway: IClienteRepositoryGateway,
        @Inject() private logger: Logger  ){}
    async criar(dto: CriarClienteParamsDto): Promise<CriarClienteReturnDto> {
        this.logger.trace("Start dto={}", dto);

        const clienteReq = this.mapDtoToDomain(dto.cliente);

        clienteReq.validar();

        const clienteOp: Optional<Cliente> = await this.clienteRepositoryGateway.obterPorCpf(<string>clienteReq.cpf);

        if (!clienteOp.isEmpty()) {
            throw new ClienteExistenteException();
        }

        const cliente = await this.clienteRepositoryGateway.criar(clienteReq);

        //this.logger.trace("End returnDto={}", returnDto);
        return new CriarClienteReturnDto(cliente.id as number);
    }

    private mapDtoToDomain(dto: ClienteDto): Cliente {
        return new Cliente(dto.id, dto.nome, dto.cpf, dto.email);
    }

}