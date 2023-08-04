import { Schema, model } from 'mongoose'
import { IWishList, IWishListModel } from './wishList.interface'

const WishListSchema = new Schema<IWishList>(
  {
    bookId: [{ type: Schema.Types.ObjectId, ref: 'Book' }],
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
)

WishListSchema.statics.existingWishList = async function (
  userId: string
): Promise<IWishList | null> {
  const wishList = await this.findOne({ userId })
  return wishList
}

const WishListModel = model<IWishList, IWishListModel>(
  'WishList',
  WishListSchema
)
export default WishListModel
