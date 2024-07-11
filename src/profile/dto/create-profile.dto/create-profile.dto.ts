import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProfileDto {
  @IsNotEmpty()
  user_id: Object;

  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsOptional()
  middleName?: string;

  @IsString()
  @IsOptional()
  about?: string;

  @IsString()
  @IsOptional()
  degree?: string;
}
