import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { ReservationModule } from '../reservation/reservation.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({ secret: 'votre-secret', signOptions: { expiresIn: '1h' } }),
    ReservationModule, 
  ],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
