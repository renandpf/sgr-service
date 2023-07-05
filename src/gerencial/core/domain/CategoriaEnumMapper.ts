import { Exception } from "@tsed/exceptions";
import { CategoriaEnum } from "./CategoriaEnum";

export class CategoriaEnumMapper{
    static numberParaEnum(codigo?: number): CategoriaEnum{
        switch (codigo){
            case 0:
                return CategoriaEnum.LANCHE;
            case 1:
                return CategoriaEnum.ACOMPANHAMENTO;
            case 2:
                return CategoriaEnum.BEBIDA;
            case 3:
                return CategoriaEnum.SOBREMESA;
            default:
                throw new Exception(500,"Categoria Inválida");
        }
    }

    static stringParaEnum(opcao?: string): CategoriaEnum{
        switch (opcao){
            case "LANCHE":
                return CategoriaEnum.LANCHE;
            case "ACOMPANHAMENTO":
                return CategoriaEnum.ACOMPANHAMENTO;
            case "BEBIDA":
                return CategoriaEnum.BEBIDA;
            case "SOBREMESA":
                return CategoriaEnum.SOBREMESA;
            default:
                throw new Exception(500,"Categoria Inválida");
        }
    }

    static stringParaNumber(opcao?: string): number {
        switch (opcao){
            case "LANCHE":
                return 0;
            case "ACOMPANHAMENTO":
                return 1;
            case "BEBIDA":
                return 2;
            case "SOBREMESA":
                return 3;
            default:
                throw new Exception(500,"Categoria Inválida");
        }
    }


    static enumParaString(categoria? : CategoriaEnum): string {

        switch (categoria){
        case CategoriaEnum.LANCHE:
            return "LANCHE";
        case CategoriaEnum.ACOMPANHAMENTO:
            return "ACOMPANHAMENTO";
        case CategoriaEnum.BEBIDA:
            return "BEBIDA";
        case CategoriaEnum.SOBREMESA:
            return "SOBREMESA";
        }

        throw new Exception(500,"Categoria Inválida");
    }
}

