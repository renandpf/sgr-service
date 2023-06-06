import { Cliente } from "../../../../../domain/Cliente";
import { Description, Example, Property } from "@tsed/schema";

export class CLienteDTOResult {
    @Description("Identificador interno d cliente")
    @Example("123456")
    @Property()
    public id: number;

    @Description("Nome do cliente")
    @Example("Cliente teste")
    @Property()
    public readonly nome: string;

    @Description("CPF")
    @Example("12345678909")
    @Property()
    public readonly cpf: string;

    @Description("E-mail")
    @Example("cliente@teste.com.br")
    @Property()
    public readonly email: string;

    constructor (cliente: Cliente){
        this.id = cliente.id;
        this.nome = cliente.nome;
        this.email = cliente.email;
        this.cpf = cliente.cpf;
    }
}