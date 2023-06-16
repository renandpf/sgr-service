import {PlatformContext, ResponseErrorObject} from "@tsed/common";
import {Catch, ExceptionFilterMethods} from "@tsed/platform-exceptions";
import {Exception} from "@tsed/exceptions";
import { SystemBaseException } from "../common";

@Catch(SystemBaseException, Exception)
export class ErrorFilter implements ExceptionFilterMethods {
    catch(exception: SystemBaseException, ctx: PlatformContext) {
        const {response, logger} = ctx;
        const error = this.mapError(exception);
        const headers = this.getHeaders(exception);

        logger.error({
            error
        });

        response
            .setHeaders(headers)
            .status(error.status || 500)
            .body(error);
    }

    mapError(error: any) {
        const systemException = error instanceof SystemBaseException;

        return {
            name: systemException ? (error as SystemBaseException).code : error.origin?.name || error.name,
            message: systemException ? (error as SystemBaseException).message : error.message,
            status: systemException ? (error as SystemBaseException).httpStatus : error.status || 500,
            // errors: this.getErrors(error)
        };
    }

    protected getErrors(error: any) {
        return [error, error.origin].filter(Boolean).reduce((errs, {errors}: ResponseErrorObject) => {
            return [...errs, ...(errors || [])];
        }, []);
    }

    protected getHeaders(error: any) {
        return [error, error.origin].filter(Boolean).reduce((obj, {headers}: ResponseErrorObject) => {
            return {
                ...obj,
                ...(headers || {})
            };
        }, {});
    }
}