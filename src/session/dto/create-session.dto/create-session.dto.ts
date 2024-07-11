import { IsNotEmpty, IsOptional, IsString, IsBoolean, IsDateString } from 'class-validator';

export class CreateSessionDto {
  @IsNotEmpty()
  user_id: string;

  @IsBoolean()
  @IsOptional()
  emailVerified?: boolean;

  @IsString()
  @IsOptional()
  emailVerificationOtp?: string;

  @IsDateString()
  @IsOptional()
  otpExpiresAt?: Date;
}