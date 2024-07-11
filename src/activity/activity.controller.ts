import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { CreateActivityDto } from './dto/create-activity.dto/create-activity.dto';
import { Activity } from './schemas/activity.schema';

@Controller('activity')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Post()
  create(@Body() createActivityDto: CreateActivityDto): Promise<Activity> {
    return this.activityService.create(createActivityDto);
  }

  @Get()
  findAll(): Promise<Activity[]> {
    return this.activityService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Activity> {
    return this.activityService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Activity> {
    return this.activityService.remove(id);
  }
}
