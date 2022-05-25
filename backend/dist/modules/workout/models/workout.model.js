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
exports.Workout = void 0;
const typeorm_1 = require("typeorm");
let Workout = class Workout extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({
        comment: 'The workout unique identifier',
    }),
    __metadata("design:type", Number)
], Workout.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: 'The workout name', type: 'varchar' }),
    __metadata("design:type", String)
], Workout.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: 'The workout type, ie: Calisthenics, Gym, Crossfit',
        type: 'varchar',
    }),
    __metadata("design:type", String)
], Workout.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: 'The workout date when it has been done', type: 'date' }),
    __metadata("design:type", Date)
], Workout.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: 'The workout duration in minutes', type: 'int' }),
    __metadata("design:type", Number)
], Workout.prototype, "duration", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: 'The workout score that the user gives',
        type: 'float',
        default: 0.0,
    }),
    __metadata("design:type", Number)
], Workout.prototype, "score", void 0);
Workout = __decorate([
    (0, typeorm_1.Entity)()
], Workout);
exports.Workout = Workout;
//# sourceMappingURL=workout.model.js.map