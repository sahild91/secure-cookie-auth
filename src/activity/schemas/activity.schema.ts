import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true, collection: 'activities' })
export class Activity extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user_id: Types.ObjectId;

  @Prop({ type: [Date] })
  mouseLeftClick: Date[];

  @Prop({ type: [Date] })
  mouseRightClick: Date[];

  @Prop({ type: [Date] })
  keyPress: Date[];
}

export const ActivitySchema = SchemaFactory.createForClass(Activity);
