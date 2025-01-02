import bcrypt from 'bcrypt';
import { model, Schema } from 'mongoose';
import { ServerConfig } from '../../config';
import { IUser } from './user.interface';

const userSchema = new Schema<IUser>(
  {
    id: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: true,
      maxlength: [20, 'Password more then 20 character'],
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ['student', 'faculty', 'admin'],
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);
// pre save middleware/ hook: will work on create() save()
userSchema.pre('save', async function (next) {
  // hashing password and save in to DB
  this.password = await bcrypt.hash(
    this.password,
    Number(ServerConfig.bcrypt_salt_rounds),
  );

  next();
});
// set " afyer saving password"
userSchema.post('save', function (doc, next) {
  doc.password = ' ';
  next();
});
export const User = model<IUser>('User', userSchema);
