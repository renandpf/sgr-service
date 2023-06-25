import { Cliente } from "../../../../../core/domain";
import { Description, Example, Property, Required } from "@tsed/schema";

export class ClienteJson {
    @Description("Identificador")
    @Example("123456")
    @Property()
    public readonly id?: number;

    @Description("Nome do cliente")
    @Example("Cliente teste")
    @Property()
    public readonly nome?: string;

    @Description("CPF")
    @Example("12345678909")
    @Required()
    @Property()
    public readonly cpf?: string;

    @Description("E-mail")
    @Example("cliente@teste.com.br")
    @Property()
    public readonly email?: string;
    
    public constructor(cliente: Cliente){
        this.id = cliente.id;
        this.nome = cliente.nome;
        this.cpf = cliente.cpf;
        this.email = cliente.email;
    }

    public getDomain(id?: number | null): Cliente{
        if(id || id === null){
            return new Cliente(id === null ? undefined : id, this.nome, this.cpf, this.email);
        } 
        return new Cliente(this.id, this.nome, this.cpf, this.email);
    }    
}