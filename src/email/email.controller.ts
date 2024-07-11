import { Controller, Post, Body } from '@nestjs/common';
import { EmailService } from './email.service';
import { SendEmailDto } from './dto/send-email.dto';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post()
  async sendMail(@Body() sendEmailDto: SendEmailDto) {
    await this.emailService.sendMail(sendEmailDto);
    return { message: 'Email sent successfully' };
  }
}
