import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  address: string;

  @Prop()
  balance: number;

  @Prop()
  whiteListCode: string;

  @Prop()
  isDeployer: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);