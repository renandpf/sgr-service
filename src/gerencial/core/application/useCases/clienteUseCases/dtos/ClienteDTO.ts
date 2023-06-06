import { Description, Example, Property, Title } from "@tsed/schema";

export class CLienteDTO {

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
    constructor (nome: string, cpf: string, email: string){
        this.nome = nome;
        this.cpf = cpf;
        this.email = email;
    }
}