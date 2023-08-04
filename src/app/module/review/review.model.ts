import { Schema, Types, model } from 'mongoose'
import { IReview, IReviewModel } from './review.interface'

const ReviewSchema = new Schema<IReview>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  bookId: {
    type: Schema.Types.ObjectId,
    ref: 'Book',
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
})

ReviewSchema.statics.getReviewByUserId = async function (
  id: string | Types.ObjectId
): Promise<IReview | null> {
  const review = await this.findById(id)
  return review
}

const ReviewModel = model<IReview, IReviewModel>(`Review`, ReviewSchema)
export default ReviewModel
