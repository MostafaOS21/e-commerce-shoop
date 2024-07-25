import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({
    required: true,
    minlength: [8, 'Password must be at least 8 length'],
  })
  password: string;

  @Prop({ required: true })
  name: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  lastLogin: Date;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop({ type: Number, default: 0 })
  totalPurchase: number;

  // TODO: Make default avatar
  @Prop({ default: '' })
  avatar: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
