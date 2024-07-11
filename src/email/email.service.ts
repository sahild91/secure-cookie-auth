import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { google } from 'googleapis';
import { SendEmailDto } from './dto/send-email.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  private oauth2Client: any;

  constructor(private configService: ConfigService) {
    this.oauth2Client = new google.auth.OAuth2(
      this.configService.get<string>('EMAIL_CLIENT_ID'),
      this.configService.get<string>('EMAIL_CLIENT_SECRET'),
      'https://developers.google.com/oauthplayground'
    );

    this.oauth2Client.setCredentials({
      refresh_token: this.configService.get<string>('EMAIL_REFRESH_TOKEN'),
    });
  }

  private async createTransporter() {
    const accessToken = await this.oauth2Client.getAccessToken();

    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: this.configService.get<string>('EMAIL_USER'),
        clientId: this.configService.get<string>('EMAIL_CLIENT_ID'),
        clientSecret: this.configService.get<string>('EMAIL_CLIENT_SECRET'),
        refreshToken: this.configService.get<string>('EMAIL_REFRESH_TOKEN'),
        accessToken: accessToken.token,
      },
    });
  }

  async sendMail(sendEmailDto: SendEmailDto) {
    const transporter = await this.createTransporter();

    const mailOptions = {
      from: `Your App <${this.configService.get<string>('EMAIL_USER')}>`,
      to: sendEmailDto.to,
      subject: sendEmailDto.subject,
      text: sendEmailDto.text,
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Error sending email', error);
      throw new InternalServerErrorException('Failed to send email');
    }
  }
}
