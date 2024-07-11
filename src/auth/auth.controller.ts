import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { EncryptionService } from '../middleware/encryption.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
    private readonly encryptionService: EncryptionService
  ) {}

  @Post('register')
  async register(@Body() encryptedBody: { data: string }) {
    const decryptedData = this.encryptionService.decryptData(encryptedBody.data);

    const createUserDto: CreateUserDto = {
      email: decryptedData.email,
      username: decryptedData.username,
      password: decryptedData.password,
      firstName: decryptedData.firstName,
      lastName: decryptedData.lastName
    }
    console.log('Inside Register endpoint');
    return this.authService.register(createUserDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('profile')
  async getProfile(@Request() req) {
    return req.user;
  }
}
