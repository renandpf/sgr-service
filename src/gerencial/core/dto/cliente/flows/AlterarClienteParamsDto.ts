import { ClienteDto } from "../ClienteDto";

export class AlterarClienteParamsDto {
    constructor(readonly cliente: ClienteDto) {}
}