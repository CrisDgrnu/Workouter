import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { HttpErrorResponse } from './interfaces/httpErrorResponse';
export declare class TypeOrmFilter implements ExceptionFilter {
    errorList: {
        [errorName: string]: HttpErrorResponse;
    };
    catch(exception: any, host: ArgumentsHost): void;
}
