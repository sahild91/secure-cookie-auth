import { IsNotEmpty, IsOptional, IsArray } from 'class-validator';

export class CreateActivityDto {
  @IsNotEmpty()
  user_id: string;

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
