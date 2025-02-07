import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { Reservation, ReservationSchema } from './schemas/reservation.schema';
import { Film, FilmSchema } from './schemas/film.schema';
import { User, UserSchema } from '../users/schemas/user.schema';  

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Reservation.name, schema: ReservationSchema },
      { name: Film.name, schema: FilmSchema },
      { name: User.name, schema: UserSchema },  
    ]),
  ],
  providers: [ReservationService],  
  controllers: [ReservationController],  
})
export class ReservationModule {}
