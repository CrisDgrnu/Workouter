"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericHttpError = void 0;
class GenericHttpError {
    constructor(statusCode, message, error) {
        this.statusCode = statusCode;
        this.message = message;
        this.error = error;
    }
}
exports.GenericHttpError = GenericHttpError;
//# sourceMappingURL=genericHttp.error.js.map