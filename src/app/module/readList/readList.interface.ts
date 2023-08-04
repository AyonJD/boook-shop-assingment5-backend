/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose'

export interface IReadList {
  bookId: Types.ObjectId[]
  userId: Types.ObjectId
}

export interface IReadListModel extends Model<IReadList> {
  existingReadList: (userId: Types.ObjectId) => Promise<IReadList | null>
}
