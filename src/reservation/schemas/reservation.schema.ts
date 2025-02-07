import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from '../../users/schemas/user.schema';  // Assurez-vous que le chemin est correct
import { Film } from './film.schema';

@Schema()
export class Reservation extends Document {
  @Prop({ required: true, type: Date })
  startTime: Date;

  @Prop({ required: true, type: Date })
  endTime: Date;

  @Prop({ type: Film })
  film: Film;

  @Prop({ type: User })
  user: User;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
