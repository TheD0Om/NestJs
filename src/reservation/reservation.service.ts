import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reservation } from '../reservation/schemas/reservation.schema';  
import { Film } from '../reservation/schemas/film.schema';  
import { CreateReservationDto } from '../reservation/dto/create-reservation.dto'; 

@Injectable()
export class ReservationService {
  constructor(
    @InjectModel(Reservation.name) private reservationModel: Model<Reservation>, 
    @InjectModel(Film.name) private filmModel: Model<Film>, 
  ) {}

  async createReservation(createReservationDto: CreateReservationDto, userId: string) {
    const { filmId, startTime } = createReservationDto;

    const film = await this.filmModel.findById(filmId);
    if (!film) {
      throw new BadRequestException('Film non trouvé');
    }

    const endTime = new Date(startTime);
    endTime.setHours(endTime.getHours() + 2);

    const conflictingReservation = await this.reservationModel.findOne({
      film: filmId,
      $or: [
        { startTime: { $lt: endTime }, endTime: { $gt: startTime } },
      ],
    });

    if (conflictingReservation) {
      throw new BadRequestException('Conflit de réservation : le film est déjà réservé à cet horaire.');
    }

    const reservation = new this.reservationModel({
      user: userId,
      film: filmId,
      startTime: new Date(startTime),
      endTime,
    });

    await reservation.save();

    return { message: 'Réservation effectuée avec succès', reservation };
  }

  async getUserReservations(userId: string) {
    const reservations = await this.reservationModel.find({ user: userId }).populate('film');
    return reservations;
  }

  async cancelReservation(reservationId: string, userId: string) {
    const reservation = await this.reservationModel.findById(reservationId);
    if (!reservation) {
      throw new NotFoundException('Réservation non trouvée');
    }

    if (reservation.user.toString() !== userId) {
      throw new BadRequestException('Vous ne pouvez annuler que vos propres réservations');
    }

    await this.reservationModel.deleteOne({ _id: reservationId });

    return { message: 'Réservation annulée avec succès' };
  }
}
