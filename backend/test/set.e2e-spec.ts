import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as pactum from 'pactum';
import { Set } from '../src/modules/set/models';
import { SetModule } from '../src/modules/set/set.module';
import { Connection, getConnection } from 'typeorm';
import { AppModule } from '../src/app.module';

describe('SetController (e2e)', () => {
  let app: INestApplication;
  let database: Connection;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, SetModule],
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

  const BASE_URL = '/set';

  const setDto1 = {
    cycles: 4,
    reps: 12,
    exerciseDto: {
      name: 'Push up',
      muscles: ['Chest', 'Triceps'],
      score: '7',
    },
    cycleBreak: 120,
    exerciseBreak: 90,
    completed: true,
    score: '8.6',
  };

  const setDto2 = {
    cycles: 4,
    reps: 5,
    exerciseDto: {
      name: 'Pull up',
      muscles: ['Back', 'Triceps', 'Biceps'],
      score: '7',
    },
    cycleBreak: 120,
    exerciseBreak: 90,
    completed: true,
    score: '8.6',
  };

  const setDto3 = {
    cycles: 4,
    reps: 12,
    exerciseDto: {
      name: 'Squat up',
      muscles: ['Legs'],
      score: '7',
    },
    cycleBreak: 120,
    exerciseBreak: 90,
    completed: true,
    score: '8.6',
  };

  describe('/set (POST)', () => {
    it('should create a set', async () => {
      const id = await pactum
        .spec()
        .post(BASE_URL)
        .withBody(setDto1)
        .expectStatus(201)
        .returns('id');

      const { cycles, reps, score } = setDto1;

      return await pactum
        .spec()
        .get(`${BASE_URL}/${id}`)
        .expectStatus(200)
        .expectBodyContains(cycles)
        .expectBodyContains(reps)
        .expectBodyContains(score);
    });

    it('should not create a set because cycles is invalid', async () => {
      const invalidDto = { ...setDto1, cycles: 'not a number' };
      const expectedError = {
        statusCode: 400,
        message: ['cycles must be an integer number'],
        error: 'Bad Request',
      };

      return await pactum
        .spec()
        .post(BASE_URL)
        .withBody(invalidDto)
        .expectStatus(400)
        .expectBody(expectedError);
    });

    it('should not create a set because exercise has invalid properties', async () => {
      const invalidDto = {
        ...setDto1,
        exerciseDto: { name: 15, muscles: [], score: '7' },
      };

      return await pactum
        .spec()
        .post(BASE_URL)
        .withBody(invalidDto)
        .expectStatus(400)
        .expectBody({
          statusCode: 400,
          message: ['exerciseDto.name must be a string'],
          error: 'Bad Request',
        });
    });
  });

  describe('/set (GET)', () => {
    beforeEach(async () => {
      const exerciseDtos = [setDto1, setDto2, setDto3];

      for (const exerciseDto of exerciseDtos) {
        await pactum
          .spec()
          .post(BASE_URL)
          .withBody(exerciseDto)
          .expectStatus(201);
      }
    });

    it('should get 3 sets (all the sets)', async () => {
      const data = (await pactum
        .spec()
        .get(BASE_URL)
        .withQueryParams('limit', 10)
        .withQueryParams('page', 0)
        .expectStatus(200)
        .returns('data')) as unknown;

      const sets = data as Set[];

      return expect(sets.length).toBeGreaterThanOrEqual(3);
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

      const sets = data as Set[];

      return expect(sets.length).toBe(0);
    });
  });

  describe('/set/:id (GET)', () => {
    it('should get a set based on its id', async () => {
      const id = await pactum
        .spec()
        .post(BASE_URL)
        .withBody(setDto1)
        .returns('id');

      const { cycles, reps, score } = setDto1;

      return await pactum
        .spec()
        .get(`${BASE_URL}/${id}`)
        .expectStatus(200)
        .expectBodyContains(cycles)
        .expectBodyContains(reps)
        .expectBodyContains(score);
    });

    it('should get 404 if the given id is not found', async () => {
      const expectedError = {
        statusCode: 404,
        message: ['the set with id 99999 has not been found'],
        error: 'Not Found',
      };

      return await pactum
        .spec()
        .get(`${BASE_URL}/99999`)
        .expectStatus(404)
        .expectBody(expectedError);
    });
  });

  describe('/set/:id (PUT)', () => {
    it('should change the name and the score of an existing exercise', async () => {
      const { cycles, score } = setDto1;

      const id = await pactum
        .spec()
        .post(BASE_URL)
        .withBody(setDto1)
        .expectStatus(201)
        .returns('id');

      await pactum
        .spec()
        .get(`${BASE_URL}/${id}`)
        .expectStatus(200)
        .expectBodyContains(cycles)
        .expectBodyContains(score);

      const updatedExerciseDto = {
        ...setDto1,
        cycles: 8,
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
        .expectBodyContains(updatedExerciseDto.cycles)
        .expectBodyContains(updatedExerciseDto.score);
    });

    it('should not affect any set with the given id', async () => {
      await pactum
        .spec()
        .put(`${BASE_URL}/9999`)
        .withBody(setDto1)
        .expectStatus(200)
        .expectBody({ affected: 0, generatedMaps: [], raw: [] });
    });

    it('should not update the set because the cycles are invalid', async () => {
      const id = await pactum
        .spec()
        .post(BASE_URL)
        .withBody(setDto1)
        .expectStatus(201)
        .returns('id');

      const updatedSetDto = {
        ...setDto1,
        cycles: 'Not a number',
        score: '1.0',
      };

      await pactum
        .spec()
        .put(`${BASE_URL}/${id}`)
        .withBody(updatedSetDto)
        .expectStatus(400)
        .expectBody({
          statusCode: 400,
          message: ['cycles must be an integer number'],
          error: 'Bad Request',
        });
    });
  });

  describe('/set/:id (DELETE)', () => {
    it('should delete the set based on the given id', async () => {
      const id = await pactum
        .spec()
        .post(BASE_URL)
        .withBody(setDto1)
        .expectStatus(201)
        .returns('id');

      await pactum
        .spec()
        .delete(`${BASE_URL}/${id}`)
        .expectStatus(200)
        .expectBody({ affected: 1, raw: [] });
    });

    it('should not delete any set becasue the given id does not exist', async () => {
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
