"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkoutService = void 0;
const common_1 = require("@nestjs/common");
let WorkoutService = class WorkoutService {
    create(workoutDto) {
        return `This methods creates a workouts based on the DTO ${workoutDto}`;
    }
    findAll() {
        return [];
    }
    findOne(id) {
        return {
            id,
            createdAt: new Date(),
            updatedAt: new Date(),
            name: 'Cristian',
            duration: null,
            score: null,
        };
    }
    update(id, updateWorkoutDto) {
        return `This method update a workout based on the id ${id} and put the information ${updateWorkoutDto}`;
    }
    remove(id) {
        return `This method removes a workout based on the id ${id}`;
    }
};
WorkoutService = __decorate([
    (0, common_1.Injectable)()
], WorkoutService);
exports.WorkoutService = WorkoutService;
//# sourceMappingURL=workout.service.js.map