import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class UserDto {
  @IsString()
  name: string;

  @IsInt()
  @IsNotEmpty()
  tg_id: number;

  @IsString()
  @IsNotEmpty()
  uin: string;
}
