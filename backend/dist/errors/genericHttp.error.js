"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericHttpError = void 0;
class GenericHttpError {
    constructor(statusCode, messages, error) {
        this.statusCode = statusCode;
        this.messages = messages;
        this.error = error;
    }
}
exports.GenericHttpError = GenericHttpError;
//# sourceMappingURL=genericHttp.error.js.map