import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { SessionService } from './session.service';
import { CreateSessionDto } from './dto/create-session.dto/create-session.dto';
import { Session } from './schemas/session.schema';

@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post()
  create(@Body() createSessionDto: CreateSessionDto): Promise<Session> {
    return this.sessionService.create(createSessionDto);
  }

  @Get()
  findAll(): Promise<Session[]> {
    return this.sessionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Session> {
    return this.sessionService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateSessionDto: CreateSessionDto,
  ): Promise<Session> {
    return this.sessionService.update(id, updateSessionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Session> {
    return this.sessionService.remove(id);
  }
}
