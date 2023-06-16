export class CartaoCredito {
    constructor(
        public readonly numero: string,
        public readonly cvv: string,
        public readonly nome: string,
        public readonly cpf: string,
        public readonly valor: number,
    ){}

}