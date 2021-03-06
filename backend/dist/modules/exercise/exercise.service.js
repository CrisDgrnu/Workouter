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
exports.ExerciseService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const nestjs_paginate_1 = require("nestjs-paginate");
const genericHttp_error_1 = require("../../errors/genericHttp.error");
const typeorm_2 = require("typeorm");
const models_1 = require("./models");
let ExerciseService = class ExerciseService {
    constructor(exerciseRepository) {
        this.exerciseRepository = exerciseRepository;
        this.pageConfig = {
            sortableColumns: ['id', 'muscles', 'score'],
            searchableColumns: ['id', 'muscles', 'score'],
            defaultSortBy: [['id', 'DESC']],
            filterableColumns: {
                score: [nestjs_paginate_1.FilterOperator.GTE, nestjs_paginate_1.FilterOperator.LTE],
            },
        };
    }
    async create(exerciseDto) {
        const createdExercise = this.exerciseRepository.create(exerciseDto);
        try {
            return await this.exerciseRepository.save(createdExercise);
        }
        catch (error) {
            throw new common_1.ConflictException(new genericHttp_error_1.GenericHttpError(409, ['duplicated name for exercise'], 'Conflict'));
        }
    }
    findAll(query) {
        return (0, nestjs_paginate_1.paginate)(query, this.exerciseRepository, this.pageConfig);
    }
    async findOne(id) {
        const exercise = await this.exerciseRepository.findOne(id);
        if (!exercise)
            throw new common_1.NotFoundException(new genericHttp_error_1.GenericHttpError(404, [`the exercise with id ${id} has not been found`], 'Not Found'));
        return exercise;
    }
    async update(id, updateExerciseDto) {
        try {
            return await this.exerciseRepository.update(id, updateExerciseDto);
        }
        catch (error) {
            throw new common_1.ConflictException(new genericHttp_error_1.GenericHttpError(409, ['duplicated name for exercise'], 'Conflict'));
        }
    }
    async remove(id) {
        try {
            return await this.exerciseRepository.delete(id);
        }
        catch (error) {
            throw new common_1.BadRequestException(new genericHttp_error_1.GenericHttpError(400, [`exercise with id ${id} is implied in some sets`], 'Bad Request'));
        }
    }
};
ExerciseService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(models_1.Exercise)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ExerciseService);
exports.ExerciseService = ExerciseService;
//# sourceMappingURL=exercise.service.js.map