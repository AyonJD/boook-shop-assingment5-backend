import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { IWishList } from './wishList.interface'
import WishListModel from './wishList.model'

const addToWishList = async (wishListData: IWishList) => {
  const { bookId, userId } = wishListData
  const isExistWishList = await WishListModel.existingWishList(userId)

  let wishList
  if (isExistWishList) {
    wishList = await WishListModel.findOneAndUpdate(
      { userId },
      { $push: { bookId } },
      { new: true }
    ).populate([
      {
        path: 'bookId',
        model: 'Book',
      },
      {
        path: 'userId',
        model: 'User',
      },
    ])
  } else {
    wishList = (await WishListModel.create(wishListData)).populate([
      {
        path: 'bookId',
        model: 'Book',
      },
      {
        path: 'userId',
        model: 'User',
      },
    ])
  }

  if (!wishList)
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Something went wrong while adding book to wishlist'
    )

  return wishList
}

export const WishListService = {
  addToWishList,
}
