import { Schema, model } from 'mongoose'
import { ICompleteList, ICompleteListModel } from './completeList.interface'

const CompleteListSchema = new Schema<ICompleteList>(
  {
    bookId: [{ type: Schema.Types.ObjectId, ref: 'Book' }],
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
)

CompleteListSchema.statics.existingCompleteList = async function (
  userId: string
): Promise<ICompleteList | null> {
  const completeList = await this.findOne({ userId })
  return completeList
}

const CompleteListModel = model<ICompleteList, ICompleteListModel>(
  'CompleteList',
  CompleteListSchema
)
export default CompleteListModel
