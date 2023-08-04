import { Schema, model } from 'mongoose'
import { IBook, IBookModel } from './book.interface'

const BookSchema = new Schema<IBook>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    author: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    publicationYear: {
      type: Number,
      required: true,
    },
    publishedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
)

BookSchema.statics.findByTitle = async function (
  title: string
): Promise<IBook | null> {
  const book = await this.findOne({ title })
  return book
}

BookSchema.statics.findByAuthor = async function (
  author: string
): Promise<IBook[] | null> {
  const books = await this.find({ author })
  return books
}

const BookModel = model<IBook, IBookModel>('Book', BookSchema)
export default BookModel
