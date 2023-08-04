import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import { WishListService } from './wishList.service'
import ApiError from '../../../errors/ApiError'
import httpStatus from 'http-status'
import { sendSuccessResponse } from '../../../shared/customResponse'
import UserModel from '../user/user.model'

const addToWishList = catchAsync(async (req: Request, res: Response) => {
  const wishListData = req.body
  const user = req.user
  if (!user) throw new ApiError(httpStatus.UNAUTHORIZED, 'User not found')
  const isUserExist = await UserModel.isUserExist(user.email)
  if (!isUserExist)
    throw new ApiError(httpStatus.UNAUTHORIZED, 'User not found')

  wishListData.userId = isUserExist._id

  const wishList = await WishListService.addToWishList(wishListData)
  const responseData = {
    message: 'Book added to wishlist successfully',
    data: wishList,
  }
  sendSuccessResponse(res, responseData)
})

const getWishListOfUser = catchAsync(async (req: Request, res: Response) => {
  const user = req.user
  if (!user) throw new ApiError(httpStatus.UNAUTHORIZED, 'User not found')
  const isUserExist = await UserModel.isUserExist(user.email)
  if (!isUserExist)
    throw new ApiError(httpStatus.UNAUTHORIZED, 'User not found')

  const wishList = await WishListService.getWishListOfUser(
    isUserExist._id as string
  )
  const responseData = {
    message: 'Wishlist fetched successfully',
    data: wishList,
  }
  sendSuccessResponse(res, responseData)
})

export const WishListController = {
  addToWishList,
  getWishListOfUser,
}
