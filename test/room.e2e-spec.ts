import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { CreateRoomDto, FindRoomDto } from './../src/room/dto/room.dto';
import { disconnect } from 'mongoose';

const ROOM_NUMBER = 10000;

const CAPACITY = 4;

const testDto: CreateRoomDto = {
  price: 100,
  description: 'test',
  capacity: CAPACITY,
  number: ROOM_NUMBER,
};

describe('RoomController (e2e)', () => {
  let app: INestApplication<App>;
  let createdId: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/room/create (POST) - success', async () => {
    return request(app.getHttpServer())
      .post('/room/create')
      .send(testDto)
      .expect(201)
      .then(({ body }: request.Response) => {
        createdId = body._id;
        expect(createdId).toBeDefined();
      });
  });

  it('/room/all (GET) should return an array of rooms', async () => {
    const response = await request(app.getHttpServer()).get('/room/all');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('/room/find (POST) should return a list of rooms by filter', async () => {
    const findDto: FindRoomDto = {
      capacity: CAPACITY,
    };

    const response = await request(app.getHttpServer()).post('/room/find').send(findDto);

    expect(response.status).toBe(201);
    expect(response.body[0]).toHaveProperty('_id');
    expect(response.body[0]._id).toBe(createdId);
  });

  it('room/:id (DELETE) - success', async () => {
    return request(app.getHttpServer()).delete(`/room/${createdId}`).expect(200);
  });

  afterAll(() => {
    disconnect();
  });
});
