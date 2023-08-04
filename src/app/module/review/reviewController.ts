import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import { ReviewService } from './review.service'
import { sendSuccessResponse } from '../../../shared/customResponse'
import UserModel from '../user/user.model'
import ApiError from '../../../errors/ApiError'
import httpStatus from 'http-status'

const createReview = catchAsync(async (req: Request, res: Response) => {
  const reviewData = req.body
  const user = req.user
  if (!user) throw new ApiError(httpStatus.UNAUTHORIZED, 'User not found')

  const retriveUser = await UserModel.isUserExist(user.email)
  if (!retriveUser)
    throw new ApiError(httpStatus.UNAUTHORIZED, 'User not found')

  reviewData.userId = retriveUser._id

  const review = await ReviewService.createReview(reviewData)
  const responseData = {
    message: 'Review submitted successfully',
    data: review,
  }
  sendSuccessResponse(res, responseData)
})

const getReviewOfBook = catchAsync(async (req: Request, res: Response) => {
  const bookId = req.params.bookId
  const reviews = await ReviewService.getReviewOfBook(bookId)
  const responseData = {
    message: 'Reviews fetched successfully',
    data: reviews,
  }
  sendSuccessResponse(res, responseData)
})

export const ReviewController = {
  createReview,
  getReviewOfBook,
}
