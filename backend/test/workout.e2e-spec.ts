import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';

import * as pactum from 'pactum';
import { WorkoutModule } from '../src/modules/workout/workout.module';
import { AppModule } from '../src/app.module';
import { Workout } from '../src/modules/workout/models';
import { Connection, getConnection } from 'typeorm';
import { workoutDto1, workoutDto2, workoutDto3 } from './data/workout.data';

describe('WorkoutController (e2e)', () => {
  let app: INestApplication;
  let database: Connection;

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

  beforeEach(async () => {
    database = getConnection();
    await database.dropDatabase();
    await database.synchronize();
  });

  const BASE_URL = '/workout';

  describe('/workout (POST)', () => {
    it('should create a workout', async () => {
      const id = await pactum
        .spec()
        .post(BASE_URL)
        .withBody(workoutDto1)
        .expectStatus(201)
        .returns('id');

      const { name, type, duration } = workoutDto1;

      return await pactum
        .spec()
        .get(`${BASE_URL}/${id}`)
        .expectStatus(200)
        .expectBodyContains(name)
        .expectBodyContains(type)
        .expectBodyContains(duration);
    });

    it('should not create a post because name is invalid', async () => {
      const invalidDto = { ...workoutDto1, name: 15 };
      const expectedError = {
        error: 'Bad Request',
        message: ['name must be a string'],
        statusCode: 400,
      };

      return await pactum
        .spec()
        .post(BASE_URL)
        .withBody(invalidDto)
        .expectStatus(400)
        .expectBody(expectedError);
    });
  });

  describe('/workout (GET)', () => {
    beforeEach(async () => {
      const workoutDtos = [workoutDto1, workoutDto2, workoutDto3];

      for (const workoutDto of workoutDtos) {
        await pactum
          .spec()
          .post(BASE_URL)
          .withBody(workoutDto)
          .expectStatus(201);
      }
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

      return expect(workouts.length).toBeGreaterThanOrEqual(3);
    });

    it('should get a page with data, meta and links', async () => {
      return await pactum
        .spec()
        .get(BASE_URL)
        .withQueryParams('limit', 10)
        .withQueryParams('page', 0)
        .expectStatus(200)
        .expectBodyContains('data')
        .expectBodyContains('meta')
        .expectBodyContains('links');
    });

    it('should get an empty array when the database is empty', async () => {
      await database.dropDatabase();
      await database.synchronize();

      const data = (await pactum
        .spec()
        .get(BASE_URL)
        .withQueryParams('limit', 10)
        .withQueryParams('page', 0)
        .expectStatus(200)
        .returns('data')) as unknown;

      const workouts = data as Workout[];

      return expect(workouts.length).toBe(0);
    });
  });

  describe('/workout/:id (GET)', () => {
    it('should get a workout based on its id', async () => {
      const id = await pactum
        .spec()
        .post(BASE_URL)
        .withBody(workoutDto1)
        .returns('id');

      const { name, type, duration } = workoutDto1;

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
        error: 'Not Found',
        message: ['the workout with id 99999 has not been found'],
        statusCode: 404,
      };

      return await pactum
        .spec()
        .get(`${BASE_URL}/99999`)
        .expectStatus(404)
        .expectBody(expectedError);
    });
  });

  describe('/workout/:id (PUT)', () => {
    it('should change the name and the type of an existing workout', async () => {
      const { name, type } = workoutDto2;

      const id = await pactum
        .spec()
        .post(BASE_URL)
        .withBody(workoutDto2)
        .expectStatus(201)
        .returns('id');

      await pactum
        .spec()
        .get(`${BASE_URL}/${id}`)
        .expectStatus(200)
        .expectBodyContains(name)
        .expectBodyContains(type);

      const updatedWorkoutDto = {
        ...workoutDto2,
        name: 'Legs',
        type: 'Crossfit',
      };

      await pactum
        .spec()
        .put(`${BASE_URL}/${id}`)
        .withBody(updatedWorkoutDto)
        .expectStatus(200)
        .expectBody({ affected: 1, generatedMaps: [], raw: [] });

      await pactum
        .spec()
        .get(`${BASE_URL}/${id}`)
        .expectStatus(200)
        .expectBodyContains(updatedWorkoutDto.name)
        .expectBodyContains(updatedWorkoutDto.type);
    });

    it('should not affect any workout with the given id', async () => {
      await pactum
        .spec()
        .put(`${BASE_URL}/9999`)
        .withBody(workoutDto1)
        .expectStatus(200)
        .expectBody({ affected: 0, generatedMaps: [], raw: [] });
    });

    it('should not update the workout because the name is invalid', async () => {
      const id = await pactum
        .spec()
        .post(BASE_URL)
        .withBody(workoutDto1)
        .expectStatus(201)
        .returns('id');

      const updatedWorkoutDto = {
        ...workoutDto1,
        name: 15,
        type: 'Crossfit',
      };

      await pactum
        .spec()
        .put(`${BASE_URL}/${id}`)
        .withBody(updatedWorkoutDto)
        .expectStatus(400)
        .expectBody({
          error: 'Bad Request',
          message: ['name must be a string'],
          statusCode: 400,
        });
    });
  });

  describe('/workout/:id (DELETE)', () => {
    it('should delete the workout based on the given id', async () => {
      const id = await pactum
        .spec()
        .post(BASE_URL)
        .withBody(workoutDto1)
        .expectStatus(201)
        .returns('id');

      await pactum
        .spec()
        .delete(`${BASE_URL}/${id}`)
        .expectStatus(200)
        .expectBody({ affected: 1, raw: [] });
    });

    it('should not delete any workout becasue the given id does not exist', async () => {
      await pactum
        .spec()
        .delete(`${BASE_URL}/99999`)
        .expectStatus(200)
        .expectBody({ affected: 0, raw: [] });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
