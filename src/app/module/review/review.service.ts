import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { IReview } from './review.interface'
import ReviewModel from './review.model'

const createReview = async (reviewData: IReview): Promise<IReview> => {
  const existingReview = await ReviewModel.getReviewByUserId(reviewData.userId)
  if (existingReview)
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'You have already reviewed this book'
    )

  const review = await (
    await ReviewModel.create(reviewData)
  ).populate([
    {
      path: 'userId',
      model: 'User',
      select: 'name email',
    },
    {
      path: 'bookId',
      model: 'Book',
    },
  ])
  if (!review)
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Error submitting review'
    )

  return review
}

const getReviewOfBook = async (bookId: string): Promise<IReview[]> => {
  const reviews = await ReviewModel.find({ bookId }).populate([
    {
      path: 'userId',
      model: 'User',
      select: 'name email',
    },
    {
      path: 'bookId',
      model: 'Book',
    },
  ])

  if (!reviews)
    throw new ApiError(httpStatus.NOT_FOUND, 'No reviews found for this book')
  return reviews
}

export const ReviewService = {
  createReview,
  getReviewOfBook,
}
