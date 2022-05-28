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
exports.Set = void 0;
const typeorm_1 = require("typeorm");
let Set = class Set extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({
        comment: 'The set unique identifier',
        type: 'int',
    }),
    __metadata("design:type", Number)
], Set.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: 'The number of cycles of the set',
        type: 'int',
    }),
    __metadata("design:type", Number)
], Set.prototype, "cycles", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: 'The number of repetitions of each cycle',
        type: 'int',
    }),
    __metadata("design:type", Number)
], Set.prototype, "reps", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: 'The exercise name',
        type: 'varchar',
    }),
    __metadata("design:type", String)
], Set.prototype, "exercise", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: 'The break of the cycle in seconds',
        type: 'int',
    }),
    __metadata("design:type", Number)
], Set.prototype, "cycleBreak", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: 'The break for each exercise in seconds',
        type: 'int',
    }),
    __metadata("design:type", Number)
], Set.prototype, "exerciseBreak", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: 'The set has been completed or not',
        type: 'boolean',
    }),
    __metadata("design:type", Boolean)
], Set.prototype, "completed", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: 'The set score that the user gives',
        type: 'float',
        default: 0.0,
    }),
    __metadata("design:type", Number)
], Set.prototype, "score", void 0);
Set = __decorate([
    (0, typeorm_1.Entity)()
], Set);
exports.Set = Set;
//# sourceMappingURL=set.model.js.map