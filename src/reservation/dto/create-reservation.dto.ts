import { IsString, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateReservationDto {
  @IsString()
  @IsNotEmpty()
  filmId: string;  
  @IsDateString()
  @IsNotEmpty()
  startTime: string; 
}
