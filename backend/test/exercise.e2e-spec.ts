import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';

import * as pactum from 'pactum';
import { AppModule } from '../src/app.module';
import { Connection, getConnection } from 'typeorm';
import { ExerciseModule } from '../src/modules/exercise/exercise.module';
import { Exercise } from '../src/modules/exercise/models';

describe('ExerciseController (e2e)', () => {
  let app: INestApplication;
  let database: Connection;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, ExerciseModule],
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

  const BASE_URL = '/exercise';

  const exerciseDto1 = {
    name: 'Diamond Push Up',
    muscles: ['Chest', 'Triceps'],
    score: '8.4',
  };

  const exerciseDto2 = {
    name: 'Squat',
    muscles: ['Legs'],
    score: '7.0',
  };

  const exerciseDto3 = {
    name: 'Pull Up',
    muscles: ['Back', 'Biceps'],
    score: '9.0',
  };

  describe('/exercise (POST)', () => {
    it('should create an exercise', async () => {
      const id = await pactum
        .spec()
        .post(BASE_URL)
        .withBody(exerciseDto1)
        .expectStatus(201)
        .returns('id');

      const { name, muscles, score } = exerciseDto1;

      return await pactum
        .spec()
        .get(`${BASE_URL}/${id}`)
        .expectStatus(200)
        .expectBodyContains(name)
        .expectBodyContains(muscles)
        .expectBodyContains(score);
    });

    it('should not create a workout because name is invalid', async () => {
      const invalidDto = { ...exerciseDto1, name: 15 };
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

    it('should not create an exercise because the name is duplicated', async () => {
      await pactum
        .spec()
        .post(BASE_URL)
        .withBody(exerciseDto1)
        .expectStatus(201);

      return await pactum
        .spec()
        .post(BASE_URL)
        .withBody(exerciseDto1)
        .expectStatus(409);
    });
  });

  describe('/exercise (GET)', () => {
    beforeEach(async () => {
      const exerciseDtos = [exerciseDto1, exerciseDto2, exerciseDto3];

      for (const exerciseDto of exerciseDtos) {
        await pactum
          .spec()
          .post(BASE_URL)
          .withBody(exerciseDto)
          .expectStatus(201);
      }
    });

    it('should get 3 exercises (all the exercises)', async () => {
      const data = (await pactum
        .spec()
        .get(BASE_URL)
        .withQueryParams('limit', 10)
        .withQueryParams('page', 0)
        .expectStatus(200)
        .returns('data')) as unknown;

      const exercises = data as Exercise[];

      return expect(exercises.length).toBeGreaterThanOrEqual(3);
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

      const workouts = data as Exercise[];

      return expect(workouts.length).toBe(0);
    });
  });

  describe('/exercise/:id (GET)', () => {
    it('should get a exercise based on its id', async () => {
      const id = await pactum
        .spec()
        .post(BASE_URL)
        .withBody(exerciseDto1)
        .returns('id');

      const { name, muscles, score } = exerciseDto1;

      return await pactum
        .spec()
        .get(`${BASE_URL}/${id}`)
        .expectStatus(200)
        .expectBodyContains(name)
        .expectBodyContains(muscles)
        .expectBodyContains(score);
    });

    it('should get 404 if the given id is not found', async () => {
      const expectedError = {
        statusCode: 404,
        message: ['the exercise with id 99999 has not been found'],
        error: 'Not Found',
      };

      return await pactum
        .spec()
        .get(`${BASE_URL}/99999`)
        .expectStatus(404)
        .expectBody(expectedError);
    });
  });

  describe('/exercise/:id (PUT)', () => {
    it('should change the name and the score of an existing exercise', async () => {
      const { name, score } = exerciseDto1;

      const id = await pactum
        .spec()
        .post(BASE_URL)
        .withBody(exerciseDto1)
        .expectStatus(201)
        .returns('id');

      await pactum
        .spec()
        .get(`${BASE_URL}/${id}`)
        .expectStatus(200)
        .expectBodyContains(name)
        .expectBodyContains(score);

      const updatedExerciseDto = {
        ...exerciseDto1,
        name: 'Legs',
        score: '9.9',
      };

      await pactum
        .spec()
        .put(`${BASE_URL}/${id}`)
        .withBody(updatedExerciseDto)
        .expectStatus(200)
        .expectBody({ affected: 1, generatedMaps: [], raw: [] });

      await pactum
        .spec()
        .get(`${BASE_URL}/${id}`)
        .expectStatus(200)
        .expectBodyContains(updatedExerciseDto.name)
        .expectBodyContains(updatedExerciseDto.score);
    });

    it('should not affect any exercise with the given id', async () => {
      await pactum
        .spec()
        .put(`${BASE_URL}/9999`)
        .withBody(exerciseDto1)
        .expectStatus(200)
        .expectBody({ affected: 0, generatedMaps: [], raw: [] });
    });

    it('should not update the exercise because the name is invalid', async () => {
      const id = await pactum
        .spec()
        .post(BASE_URL)
        .withBody(exerciseDto1)
        .expectStatus(201)
        .returns('id');

      const updatedExerciseDto = {
        ...exerciseDto1,
        name: 15,
        score: '1.0',
      };

      await pactum
        .spec()
        .put(`${BASE_URL}/${id}`)
        .withBody(updatedExerciseDto)
        .expectStatus(400)
        .expectBody({
          statusCode: 400,
          message: ['name must be a string'],
          error: 'Bad Request',
        });
    });

    it('should not update the exercise because the name is invalid', async () => {
      await pactum
        .spec()
        .post(BASE_URL)
        .withBody(exerciseDto1)
        .expectStatus(201);

      const id = await pactum
        .spec()
        .post(BASE_URL)
        .withBody(exerciseDto2)
        .expectStatus(201)
        .returns('id');

      return await pactum
        .spec()
        .put(`${BASE_URL}/${id}`)
        .withBody(exerciseDto1)
        .expectStatus(409);
    });
  });

  describe('/exercise/:id (DELETE)', () => {
    it('should delete the exercise based on the given id', async () => {
      const id = await pactum
        .spec()
        .post(BASE_URL)
        .withBody(exerciseDto1)
        .expectStatus(201)
        .returns('id');

      await pactum
        .spec()
        .delete(`${BASE_URL}/${id}`)
        .expectStatus(200)
        .expectBody({ affected: 1, raw: [] });
    });

    it('should not delete any exercise becasue the given id does not exist', async () => {
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
