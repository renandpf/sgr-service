export class Pagamento {
    constructor(
        public readonly numero: string,
        public readonly cvv: string,
        public readonly nome: string,
        public readonly cpf: string,
    ){}

}