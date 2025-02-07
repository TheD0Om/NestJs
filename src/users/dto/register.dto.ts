import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'test@mail.com', description: 'Adresse e-mail de l\'utilisateur' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123', description: 'Mot de passe sécurisé (min. 6 caractères)' })
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
