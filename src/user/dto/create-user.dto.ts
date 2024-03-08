import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  login: string;

  @IsNotEmpty()
  password: string;
}
