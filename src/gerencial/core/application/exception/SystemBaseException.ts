export abstract class SystemBaseException extends Error {
    public abstract readonly code: string;
    public abstract readonly message: string;
    public abstract readonly httpStatus: number;
}