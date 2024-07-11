import { IsNotEmpty, IsOptional, IsArray, IsDateString } from 'class-validator';

export class CreateActivityDto {
  @IsNotEmpty()
  user_id: Object;

  @IsDateString()
  lastLogin: string;

  @IsArray()
  @IsOptional()
  mouseLeftClick: Date[];

  @IsArray()
  @IsOptional()
  mouseRightClick: Date[];

  @IsArray()
  @IsOptional()
  keyPress: Date[];
}
