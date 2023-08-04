/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose'

export interface IBook {
  title: string
  author: string
  genre: string
  publicationYear: number
  publishedBy: Types.ObjectId
}

export interface IBookModel extends Model<IBook> {
  findByTitle(title: string): Promise<IBook | null>
  findByAuthor(author: string): Promise<IBook[] | null>
}

export interface IBookFilter {
  searchTerm?: string
}
