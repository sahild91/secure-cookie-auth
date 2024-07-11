import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Session } from './schemas/session.schema';
import { CreateSessionDto } from './dto/create-session.dto/create-session.dto';

@Injectable()
export class SessionService {
  constructor(
    @InjectModel(Session.name) private sessionModel: Model<Session>,
  ) {}

  async create(createSessionDto: CreateSessionDto): Promise<Session> {
    const session = new this.sessionModel(createSessionDto);
    return session.save();
  }

  async findAll(): Promise<Session[]> {
    return this.sessionModel.find().exec();
  }

  async findOne(id: string): Promise<Session> {
    const session = await this.sessionModel.findById(id).exec();
    if (!session) {
      throw new NotFoundException(`Session #${id} not found`);
    }
    return session;
  }

  async update(id: string, updateSessionDto: CreateSessionDto): Promise<Session> {
    const existingSession = await this.sessionModel.findByIdAndUpdate(
      id,
      updateSessionDto,
      { new: true },
    ).exec();

    if (!existingSession) {
      throw new NotFoundException(`Session #${id} not found`);
    }

    return existingSession;
  }

  async remove(id: string): Promise<Session> {
    const session = await this.sessionModel.findByIdAndDelete(id).exec();
    if (!session) {
      throw new NotFoundException(`Session #${id} not found`);
    }
    return session;
  }
}
