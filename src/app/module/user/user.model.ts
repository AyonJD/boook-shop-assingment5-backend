import { Schema, model } from 'mongoose'
import { IUser, IUserModel } from './user.interface'

const UserSchema = new Schema<IUser>(
  {
    name: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      select: false,
    },
  },
  { timestamps: true }
)

UserSchema.statics.isUserExist = async function (
  email: string
): Promise<IUser | null> {
  const user = await this.findOne({ email })
  return user
}

const UserModel = model<IUser, IUserModel>('User', UserSchema)
export default UserModel
