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
exports.SetService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const nestjs_paginate_1 = require("nestjs-paginate");
const typeorm_2 = require("typeorm");
const models_1 = require("./models");
let SetService = class SetService {
    constructor(setRepository) {
        this.setRepository = setRepository;
    }
    create(setDto) {
        const createdSet = this.setRepository.create(setDto);
        return this.setRepository.save(createdSet);
    }
    findAll(query) {
        return (0, nestjs_paginate_1.paginate)(query, this.setRepository, {
            sortableColumns: [
                'id',
                'cycles',
                'reps',
                'cycleBreak',
                'exerciseBreak',
                'completed',
                'score',
            ],
            searchableColumns: [
                'id',
                'cycles',
                'reps',
                'cycleBreak',
                'exerciseBreak',
                'completed',
                'score',
            ],
            defaultSortBy: [['id', 'DESC']],
            filterableColumns: {
                score: [nestjs_paginate_1.FilterOperator.GTE, nestjs_paginate_1.FilterOperator.LTE],
            },
        });
    }
    async findOne(id) {
        const set = await this.setRepository.findOne(id);
        if (!set)
            throw new common_1.NotFoundException({
                statusCode: 404,
                message: [`the set with id ${id} has not been found`],
                error: 'Not Found',
            });
        return set;
    }
    update(id, updateSetDto) {
        return this.setRepository.update(id, updateSetDto);
    }
    async remove(id) {
        return this.setRepository.delete(id);
    }
};
SetService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(models_1.Set)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SetService);
exports.SetService = SetService;
//# sourceMappingURL=set.service.js.map