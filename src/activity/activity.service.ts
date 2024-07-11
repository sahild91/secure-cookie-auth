import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Activity } from './schemas/activity.schema';
import { CreateActivityDto } from './dto/create-activity.dto/create-activity.dto';

@Injectable()
export class ActivityService {
  constructor(
    @InjectModel(Activity.name) private activityModel: Model<Activity>,
  ) {}

  async create(createActivityDto: CreateActivityDto): Promise<Activity> {
    const activity = new this.activityModel(createActivityDto);
    return activity.save();
  }

  async findAll(): Promise<Activity[]> {
    return this.activityModel.find().exec();
  }

  async findOne(id: Object): Promise<Activity> {
    const activity = await this.activityModel.findById(id).exec();
    if (!activity) {
      throw new NotFoundException(`Activity #${id.toString()} not found`);
    }
    return activity;
  }

  async remove(id: string): Promise<Activity> {
    const activity = await this.activityModel.findByIdAndDelete(id).exec();
    if (!activity) {
      throw new NotFoundException(`Activity #${id} not found`);
    }
    return activity;
  }
}
