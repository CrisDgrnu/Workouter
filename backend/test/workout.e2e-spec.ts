import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';

import * as pactum from 'pactum';
import { WorkoutModule } from '../src/modules/workout/workout.module';
import { AppModule } from '../src/app.module';
import { Workout } from 'src/modules/workout/models';

describe('WorkoutController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, WorkoutModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();
    await app.listen(3333);
    pactum.request.setBaseUrl('http://localhost:3333');
  });

  const BASE_URL = '/workout';

  describe('/workout (POST)', () => {
    const workoutDto = {
      name: 'Full Body',
      type: 'Calisthenics',
      date: '2022-04-04T00:00:00.000Z',
      duration: 56,
      score: '8.4',
    };

    it('should create a post', async () => {
      const id = await pactum
        .spec()
        .post(BASE_URL)
        .withBody(workoutDto)
        .expectStatus(201)
        .returns('id');

      const { name, type, duration } = workoutDto;

      return await pactum
        .spec()
        .get(`${BASE_URL}/${id}`)
        .expectStatus(200)
        .expectBodyContains(name)
        .expectBodyContains(type)
        .expectBodyContains(duration);
    });

    it('should not create a post because name is invalid', async () => {
      const invalidDto = { ...workoutDto, name: 15 };
      const expectedError = {
        statusCode: 400,
        message: ['name must be a string'],
        error: 'Bad Request',
      };

      return await pactum
        .spec()
        .post(BASE_URL)
        .withBody(invalidDto)
        .expectStatus(400)
        .expectBody(expectedError);
    });
  });

  describe('/workout/:id (GET)', () => {
    it('should get a workout based on its id', async () => {
      const workoutDto = {
        name: 'Full Body',
        type: 'Calisthenics',
        date: '2022-04-04T00:00:00.000Z',
        duration: 56,
        score: '8.4',
      };

      const id = await pactum
        .spec()
        .post(BASE_URL)
        .withBody(workoutDto)
        .returns('id');

      const { name, type, duration } = workoutDto;

      return await pactum
        .spec()
        .get(`${BASE_URL}/${id}`)
        .expectStatus(200)
        .expectBodyContains(name)
        .expectBodyContains(type)
        .expectBodyContains(duration);
    });

    it('should get 404 if the given id is not found', async () => {
      const expectedError = {
        statusCode: 404,
        message: ['the workout with id 99999 has not been found'],
        error: 'Not found',
      };

      return await pactum
        .spec()
        .get(`${BASE_URL}/99999`)
        .expectStatus(404)
        .expectBody(expectedError);
    });
  });

  describe('/workout (GET)', () => {
    beforeEach(async () => {
      const workoutDto1 = {
        name: 'Legs',
        type: 'Calisthenics',
        date: '2022-04-04T00:00:00.000Z',
        duration: 56,
        score: '8.4',
      };

      const workoutDto2 = {
        name: 'Full Body',
        type: 'Calisthenics',
        date: '2022-04-04T00:00:00.000Z',
        duration: 56,
        score: '8.0',
      };

      const workoutDto3 = {
        name: 'Muscle Up',
        type: 'Calisthenics',
        date: '2022-04-04T00:00:00.000Z',
        duration: 56,
        score: '9.4',
      };

      const workouts = [workoutDto1, workoutDto2, workoutDto3];

      workouts.forEach(async (workoutDto) => {
        await pactum
          .spec()
          .post(BASE_URL)
          .withBody(workoutDto)
          .expectStatus(201);
      });
    });

    it('should get 3 workouts (all the workouts)', async () => {
      const data = (await pactum
        .spec()
        .get(BASE_URL)
        .withQueryParams('limit', 10)
        .withQueryParams('page', 0)
        .expectStatus(200)
        .returns('data')) as unknown;

      const workouts = data as Workout[];

      expect(workouts.length).toBeGreaterThanOrEqual(3);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
