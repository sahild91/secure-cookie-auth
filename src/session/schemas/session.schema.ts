import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true, collection: 'sessions' })
export class Session extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user_id: Types.ObjectId;

  @Prop({ default: false })
  emailVerified: boolean;

  @Prop({ required: false })
  emailVerificationOtp: string;

  @Prop({ required: false })
  otpExpiresAt: Date;
}

export const SessionSchema = SchemaFactory.createForClass(Session);
