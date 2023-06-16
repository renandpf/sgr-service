import { HTTPException } from "@tsed/exceptions";

export class SystemBaseException extends HTTPException {
    public code: string;
    //public readonly message: string;
    public httpStatus: number;
}