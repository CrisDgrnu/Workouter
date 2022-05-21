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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkoutService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const nestjs_paginate_1 = require("nestjs-paginate");
const models_1 = require("../models");
let WorkoutService = class WorkoutService {
    constructor(workoutRepository) {
        this.workoutRepository = workoutRepository;
    }
    create(workoutDto) {
        const createdWorkout = this.workoutRepository.create(workoutDto);
        return this.workoutRepository.save(createdWorkout);
    }
    findAll(query) {
        return (0, nestjs_paginate_1.paginate)(query, this.workoutRepository, {
            sortableColumns: ['id', 'name', 'type', 'date', 'duration', 'score'],
            searchableColumns: ['id', 'name', 'type', 'date', 'duration', 'score'],
            defaultSortBy: [['id', 'DESC']],
            filterableColumns: {
                score: [nestjs_paginate_1.FilterOperator.GTE, nestjs_paginate_1.FilterOperator.LTE],
            },
        });
    }
    findOne(id) {
        return this.workoutRepository.findOne(id);
    }
    update(id, updateWorkoutDto) {
        return this.workoutRepository.update(id, updateWorkoutDto);
    }
    async remove(id) {
        return this.workoutRepository.delete(id);
    }
};
WorkoutService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(models_1.Workout)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], WorkoutService);
exports.WorkoutService = WorkoutService;
//# sourceMappingURL=workout.service.js.map