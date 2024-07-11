import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Profile } from './schemas/profile.schema';
import { CreateProfileDto } from './dto/create-profile.dto/create-profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile.name) private profileModel: Model<Profile>,
  ) {}

  async create(createProfileDto: CreateProfileDto): Promise<Profile> {
    const profile = new this.profileModel(createProfileDto);
    return profile.save();
  }

  async findAll(): Promise<Profile[]> {
    return this.profileModel.find().exec();
  }

  async findOne(id: string): Promise<Profile> {
    const profile = await this.profileModel.findById(id).exec();
    if (!profile) {
      throw new NotFoundException(`Profile #${id} not found`);
    }
    return profile;
  }

  async update(id: string, updateProfileDto: CreateProfileDto): Promise<Profile> {
    const existingProfile = await this.profileModel.findByIdAndUpdate(
      id,
      updateProfileDto,
      { new: true },
    ).exec();

    if (!existingProfile) {
      throw new NotFoundException(`Profile #${id} not found`);
    }

    return existingProfile;
  }

  async remove(id: string): Promise<Profile> {
    const profile = await this.profileModel.findByIdAndDelete(id).exec();
    if (!profile) {
      throw new NotFoundException(`Profile #${id} not found`);
    }
    return profile;
  }
}
