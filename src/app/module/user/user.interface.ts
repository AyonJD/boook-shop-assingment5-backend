/* eslint-disable no-unused-vars */
import { Model } from 'mongoose'

export interface IUser {
  name: {
    first: string
    last: string
  }
  email: string
  password: string
}

export interface IUserModel extends Model<IUser> {
  isUserExist(email: string): Promise<IUser | null>
}
