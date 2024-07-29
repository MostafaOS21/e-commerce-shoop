import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

@Schema()
class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({
    required: true,
    minlength: [8, 'Password must be at least 8 length'],
  })
  password: string;

  @Prop({ required: true, unique: true })
  username: string;

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

  @Prop({ type: String, default: UserRole.USER })
  role: UserRole;

  // TODO: Make default avatar
  @Prop({ default: '' })
  avatar: string;
}

const UserSchema = SchemaFactory.createForClass(User);

export { UserSchema, User };
