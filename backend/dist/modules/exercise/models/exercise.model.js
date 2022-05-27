"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Exercise = void 0;
const typeorm_1 = require("typeorm");
let Exercise = class Exercise extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({
        comment: 'The exercise unique identifier',
    }),
    __metadata("design:type", Number)
], Exercise.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: 'The name of the exercise',
        type: 'varchar',
        unique: true,
    }),
    __metadata("design:type", String)
], Exercise.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: 'The list of muscles hit by the exercise',
        type: 'simple-array',
    }),
    __metadata("design:type", Array)
], Exercise.prototype, "muscles", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: 'The exercise score given by the system',
        type: 'float',
        default: 0.0,
    }),
    __metadata("design:type", Number)
], Exercise.prototype, "score", void 0);
Exercise = __decorate([
    (0, typeorm_1.Entity)()
], Exercise);
exports.Exercise = Exercise;
//# sourceMappingURL=exercise.model.js.map