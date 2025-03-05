import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';
import { Role } from 'src/common/enams/role.enam';

export type UserDocument = HydratedDocument<UserModel>;

@Schema({ timestamps: true })
export class UserModel extends Document {
  @Prop({ unique: true, required: true })
  email: string;

  @Prop()
  passwordHash: string;

  @Prop()
  name: string;

  @Prop()
  phoneNumber: string;

  @Prop({ enum: Role, default: Role.USER })
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
