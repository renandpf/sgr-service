import { Cliente } from "../../../../../core/domain";
import { Description, Example, Property } from "@tsed/schema";

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
    
    public getDomain(id?: number): Cliente{
        if(id){
            return new Cliente(id, this.nome, this.cpf, this.email);
        } 
        return new Cliente(this.id, this.nome, this.cpf, this.email);
    }    
}