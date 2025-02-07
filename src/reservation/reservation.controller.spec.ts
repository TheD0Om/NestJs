import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../app.module';

describe('ReservationController', () => {
  let app;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/POST reservations (should create a reservation)', async () => {
    return request(app.getHttpServer())
      .post('/reservations')
      .send({ filmId: '1', startTime: '2025-02-07T10:00:00Z' })
      .expect(201)
      .expect({ message: 'Réservation effectuée avec succès', reservation: expect.any(Object) });
  });

  it('/GET reservations (should return reservations)', async () => {
    return request(app.getHttpServer())
      .get('/reservations')
      .expect(200)
      .expect([]);
  });

  it('/DELETE reservations/:id (should delete a reservation)', async () => {
    return request(app.getHttpServer())
      .delete('/reservations/1')
      .expect(200)
      .expect({ message: 'Réservation annulée avec succès' });
  });

  afterAll(async () => {
    await app.close();
  });
});
