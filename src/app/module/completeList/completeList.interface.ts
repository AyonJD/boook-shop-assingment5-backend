/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose'

export interface ICompleteList {
  bookId: Types.ObjectId[]
  userId: Types.ObjectId
}

export interface ICompleteListModel extends Model<ICompleteList> {
  existingCompleteList: (
    userId: Types.ObjectId
  ) => Promise<ICompleteList | null>
}
