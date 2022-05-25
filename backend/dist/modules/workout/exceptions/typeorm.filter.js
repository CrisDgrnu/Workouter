"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeOrmFilter = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let TypeOrmFilter = class TypeOrmFilter {
    constructor() {
        this.errorList = {
            GenericError: {
                statusCode: 500,
                message: ['Unknown Error'],
                error: 'Internal Server Error',
            },
            QueryFailedError: {
                statusCode: 400,
                message: ['A field in the request is invalid'],
                error: 'Bad Request',
            },
        };
    }
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const errorName = exception.name;
        common_1.Logger.error(exception.message, exception.name);
        const errorResponse = this.errorList[errorName] || this.errorList['GenericError'];
        errorResponse.message.push(exception.message);
        response.json(errorResponse);
    }
};
TypeOrmFilter = __decorate([
    (0, common_1.Catch)(typeorm_1.TypeORMError)
], TypeOrmFilter);
exports.TypeOrmFilter = TypeOrmFilter;
//# sourceMappingURL=typeorm.filter.js.map