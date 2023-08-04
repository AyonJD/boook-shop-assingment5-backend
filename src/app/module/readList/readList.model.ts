import { Schema, model } from 'mongoose'
import { IReadList, IReadListModel } from './readList.interface'

const ReadListSchema = new Schema<IReadList>(
  {
    bookId: [{ type: Schema.Types.ObjectId, ref: 'Book' }],
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
)

ReadListSchema.statics.existingReadList = async function (
  userId: string
): Promise<IReadList | null> {
  const readList = await this.findOne({ userId })
  return readList
}

const ReadListModel = model<IReadList, IReadListModel>(
  'ReadList',
  ReadListSchema
)
export default ReadListModel
