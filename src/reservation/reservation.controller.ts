import { Controller, Post, Get, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // On suppose que tu as un guard pour vérifier le JWT
import { BadRequestException, NotFoundException } from '@nestjs/common';

@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  @UseGuards(JwtAuthGuard) 
  async createReservation(
    @Body() createReservationDto: CreateReservationDto, 
    @Param('userId') userId: string, 
  ) {
    try {
      return await this.reservationService.createReservation(createReservationDto, userId);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message); 
      }
      throw error; 
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard) 
  async getUserReservations(@Param('userId') userId: string) {
    try {
      return await this.reservationService.getUserReservations(userId);
    } catch (error) {
      throw new NotFoundException('Aucune réservation trouvée pour cet utilisateur.');
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard) 
  async cancelReservation(@Param('id') reservationId: string, @Param('userId') userId: string) {
    try {
      return await this.reservationService.cancelReservation(reservationId, userId);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Réservation non trouvée.');
      }
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      }
      throw error;
    }
  }
}
