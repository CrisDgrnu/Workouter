"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomLogger = void 0;
class CustomLogger {
    log(message, ...optionalParams) {
        console.log('\x1b[36m%s\x1b[0m', `${new Date().toISOString()}    [LOG]     ${message}`);
    }
    error(message, ...optionalParams) {
        console.error(message);
    }
    warn(message, ...optionalParams) {
        console.warn(message);
    }
    debug(message, ...optionalParams) {
        console.debug(message);
    }
    verbose(message, ...optionalParams) {
        console.log(message, optionalParams);
    }
}
exports.CustomLogger = CustomLogger;
//# sourceMappingURL=logger.js.map