import { Test } from '@nestjs/testing';
import { WorkoutDto } from '../dto';
import { Workout } from '../models';
import { WorkoutController } from './workout.controller';
import { WorkoutService } from '../workout.service';

describe('WorkoutController', () => {
  let workoutController: WorkoutController;

  const createMockWorkout = (dto?: WorkoutDto) => {
    if (dto) return { ...new Workout(dto), id: 1 } as Workout;

    const defaultWorkout = new Workout({
      name: 'Full Body',
      type: 'Calisthenics',
      date: new Date('2022-05-05'),
      duration: 56,
      score: 8.3,
    });

    return { ...defaultWorkout, id: 1 } as Workout;
  };

  const mockWorkoutService = {
    create: (dto: WorkoutDto) => createMockWorkout(dto),
    findOne: (id: number) => (id == 1 ? createMockWorkout() : undefined),
    findAll: () => [createMockWorkout(), createMockWorkout()],
    update: (id: number) => {
      const updateResult = {
        generatedMaps: [],
        raw: [],
      };
      if (id == 1) return { ...updateResult, affected: 1 };
      return { ...updateResult, affected: 0 };
    },
    remove: (id: number) => {
      const deleteResult = { raw: [] };
      if (id == 1) return { ...deleteResult, affected: 1 };
      return { ...deleteResult, affected: 0 };
    },
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [WorkoutController],
      providers: [WorkoutService],
    })
      .overrideProvider(WorkoutService)
      .useValue(mockWorkoutService)
      .compile();

    workoutController = moduleRef.get<WorkoutController>(WorkoutController);
  });

  it('should be definded', () => {
    expect(workoutController).toBeDefined();
  });

  describe('create', () => {
    it('should create a workout', async () => {
      const dto = {
        name: 'Full Body',
        type: 'Calisthenics',
        date: new Date('2022-05-05'),
        duration: 56,
        score: 8.3,
      };

      const result = createMockWorkout();
      expect(await workoutController.create(dto)).toEqual(result);
    });
  });

  describe('findOne', () => {
    const result = createMockWorkout();

    it('should return the expected workout', async () => {
      expect(await workoutController.findOne(1)).toEqual(result);
    });

    it('should return nothing', async () => {
      expect(await workoutController.findOne(2)).toEqual(undefined);
    });
  });

  describe('findAll', () => {
    it('should return 2 workouts', async () => {
      expect((await workoutController.findAll()).length).toBe(2);
    });
  });

  describe('update', () => {
    const dto = {
      name: 'Legs Body',
      type: 'Calisthenics',
      date: new Date('2022-05-05'),
      duration: 56,
      score: 8.3,
    };

    it('should update a workout', async () => {
      expect(await (await workoutController.update(1, dto)).affected).toBe(1);
    });

    it('should not update a workout', async () => {
      expect(await (await workoutController.update(2, dto)).affected).toBe(0);
    });
  });

  describe('remove', () => {
    it('should remove a workout', async () => {
      expect(await (await workoutController.remove(1)).affected).toBe(1);
    });

    it('should not update a workout', async () => {
      expect(await (await workoutController.remove(2)).affected).toBe(0);
    });
  });
});
