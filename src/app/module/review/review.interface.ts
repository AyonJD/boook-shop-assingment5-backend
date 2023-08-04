import { Model, Types } from 'mongoose'

export interface IReview {
  bookId: Types.ObjectId
  userId: Types.ObjectId
  comment: string
}

export interface IReviewModel extends Model<IReview> {
  // eslint-disable-next-line no-unused-vars
  getReviewByUserId(id: string | Types.ObjectId): Promise<IReview>
}
