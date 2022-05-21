import { Test } from '@nestjs/testing';
import { WorkoutDto } from '../dto';
import { Workout } from '../models';
import { WorkoutService } from '../services/workout.service';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('WorkoutController', () => {
  let workoutService: WorkoutService;

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

  const mockWorkoutRepository = {
    create: jest.fn((dto: WorkoutDto) => createMockWorkout(dto)),
    save: jest.fn((workout: Workout) => workout),
    find: jest.fn(() => [createMockWorkout(), createMockWorkout()]),
    findOne: jest.fn((id: number) =>
      id === 1 ? createMockWorkout() : undefined,
    ),
    update: jest.fn((id: number) => {
      const updateResult = {
        generatedMaps: [],
        raw: [],
      };
      if (id == 1) return { ...updateResult, affected: 1 };
      return { ...updateResult, affected: 0 };
    }),
    delete: jest.fn((id: number) => {
      const deleteResult = { raw: [] };
      if (id == 1) return { ...deleteResult, affected: 1 };
      return { ...deleteResult, affected: 0 };
    }),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        WorkoutService,
        {
          provide: getRepositoryToken(Workout),
          useValue: mockWorkoutRepository,
        },
      ],
    }).compile();

    workoutService = moduleRef.get<WorkoutService>(WorkoutService);
  });

  it('should be definded', () => {
    expect(workoutService).toBeDefined();
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

      const result = createMockWorkout(dto);
      expect(await workoutService.create(dto)).toEqual(result);
    });
  });

  describe('findAll', () => {
    it('should return 2 workouts', async () => {
      expect((await workoutService.findAll()).length).toBe(2);
    });
  });

  describe('findOne', () => {
    const result = createMockWorkout();

    it('should return the expected workout', async () => {
      expect(await workoutService.findOne(1)).toEqual(result);
    });

    it('should return nothing', async () => {
      expect(await workoutService.findOne(2)).toEqual(undefined);
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
      expect(await (await workoutService.update(1, dto)).affected).toBe(1);
    });

    it('should not update a workout', async () => {
      expect(await (await workoutService.update(2, dto)).affected).toBe(0);
    });
  });

  describe('remove', () => {
    it('should remove a workout', async () => {
      expect(await (await workoutService.remove(1)).affected).toBe(1);
    });

    it('should not update a workout', async () => {
      expect(await (await workoutService.remove(2)).affected).toBe(0);
    });
  });
});
