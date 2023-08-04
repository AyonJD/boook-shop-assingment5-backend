/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose'

export interface IWishList {
  bookId: Types.ObjectId[]
  userId: Types.ObjectId
}

export interface IWishListModel extends Model<IWishList> {
  existingWishList: (userId: Types.ObjectId) => Promise<IWishList | null>
}
