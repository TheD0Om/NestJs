import { Test, TestingModule } from '@nestjs/testing';
import { ReservationService } from './reservation.service';
import { Reservation } from './schemas/reservation.schema';
import { Film } from './schemas/film.schema';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { BadRequestException } from '@nestjs/common';

describe('ReservationService', () => {
  let service: ReservationService;
  let reservationModel: Model<Reservation>;
  let filmModel: Model<Film>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReservationService,
        {
          provide: getModelToken(Reservation.name),
          useValue: { create: jest.fn() },
        },
        {
          provide: getModelToken(Film.name),
          useValue: { findById: jest.fn() },
        },
      ],
    }).compile();

    service = module.get<ReservationService>(ReservationService);
    reservationModel = module.get<Model<Reservation>>(getModelToken(Reservation.name));
    filmModel = module.get<Model<Film>>(getModelToken(Film.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createReservation', () => {
    it('should throw BadRequestException if film not found', async () => {
      jest.spyOn(filmModel, 'findById').mockResolvedValueOnce(null);

      try {
        await service.createReservation({ filmId: '1', startTime: '2025-02-07T10:00:00Z' }, 'userId');
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toBe('Film non trouvé');
      }
    });

    it('should create a reservation successfully', async () => {
      const mockFilm = { _id: '1', title: 'Test Film' };
      jest.spyOn(filmModel, 'findById').mockResolvedValueOnce(mockFilm as any);
      jest.spyOn(reservationModel, 'create').mockResolvedValueOnce(mockFilm as any);

      const result = await service.createReservation({ filmId: '1', startTime: '2025-02-07T10:00:00Z' }, 'userId');

      expect(result).toEqual({ message: 'Réservation effectuée avec succès', reservation: mockFilm });
    });
  });
});
