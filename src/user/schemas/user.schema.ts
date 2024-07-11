import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Schema({ timestamps: true, collection: 'users' })
export class User extends Document {
  @Prop({ unique: true, required: true, lowercase: true, trim: true })
  email: string;

  @Prop({ unique: true, required: true, trim: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ enum: ['user', 'admin'], default: 'user' })
  role: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: Date.now })
  lastActiveAt: Date;

  @Prop()
  source: any;

  @Prop({ type: Types.ObjectId, ref: 'Profile' })
  profile: Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12);
  next();
});
