"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const models_1 = require("./models");
const workout_controller_1 = require("./workout.controller");
const workout_service_1 = require("./workout.service");
describe('CatsController', () => {
    let workoutController;
    let workoutService;
    beforeEach(async () => {
        const moduleRef = await testing_1.Test.createTestingModule({
            controllers: [workout_controller_1.WorkoutController],
            providers: [workout_service_1.WorkoutService],
        }).compile();
        workoutController = moduleRef.get(workout_controller_1.WorkoutController);
        workoutService = moduleRef.get(workout_service_1.WorkoutService);
        it('should be definded', () => {
            expect(workoutController).toBeDefined();
        });
        describe('findOne', () => {
            it('should return the expected workout', async () => {
                const result = new models_1.Workout({
                    name: 'Full Body',
                    type: 'Calisthenics',
                    date: new Date(),
                    duration: 56,
                    score: 8.3,
                });
                jest
                    .spyOn(workoutService, 'findOne')
                    .mockImplementation(async () => result);
                expect(await workoutController.findOne(1)).toBe(result);
            });
        });
    });
});
//# sourceMappingURL=workout.controller.test.js.map