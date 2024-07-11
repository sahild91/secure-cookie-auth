import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { ProfileService } from 'src/profile/profile.service';
import { CreateProfileDto } from 'src/profile/dto/create-profile.dto/create-profile.dto';
import { CreateActivityDto } from 'src/activity/dto/create-activity.dto/create-activity.dto';
import { ActivityService } from 'src/activity/activity.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly profileService: ProfileService,
    private readonly activityService: ActivityService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException();
    }
    const payload = { email: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(createUserDto: CreateUserDto): Promise<any> {
    const { email, username, password, firstName, lastName } = createUserDto;

    // Check if the user already exists
    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const user = this.userService.create(createUserDto);

    const profileDto: CreateProfileDto = {
      user_id: (await user)._id,
      firstName: firstName,
      lastName: lastName,
      about: "",
      middleName: "",
      degree: ""
    }

    const activityDto: CreateActivityDto = {
      user_id: (await user)._id,
      lastLogin: new Date().toDateString(),
      mouseLeftClick: [],
      mouseRightClick: [],
      keyPress: []
    }

    const profile = this.profileService.create(profileDto);

    const activity = this.activityService.create(activityDto);

    const payload = { username: (await user).username, sub: (await user)._id };

    return {
      token: this.jwtService.sign(payload),
      userId: (await user)._id, // Include user ID in the response
    };
  }
}
