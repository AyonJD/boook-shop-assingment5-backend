import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { IBook, IBookFilter } from './book.interface'
import BookModel from './book.model'
import {
  IGenericDataWithMeta,
  IPaginationOption,
} from '../../../interfaces/sharedInterface'
import { BOOK_SEARCH_FIELDS } from './book.constant'
import paginationHelper from '../../helpers/paginationHelper'
import { SortOrder } from 'mongoose'

const createBook = async (bookData: IBook): Promise<IBook> => {
  const isExistBook = await BookModel.findByTitle(bookData.title)
  if (isExistBook)
    throw new ApiError(httpStatus.BAD_REQUEST, 'Book already exist')

  const book = await (await BookModel.create(bookData)).populate('publishedBy')
  if (!book)
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Something went wrong while adding book'
    )

  return book
}

const getAllBooks = async (
  filters: IBookFilter,
  paginationOption: IPaginationOption
): Promise<IGenericDataWithMeta<IBook[]>> => {
  const { searchTerm, ...filterFields } = filters

  const andConditions = []
  if (searchTerm) {
    andConditions.push({
      $or: BOOK_SEARCH_FIELDS.map(field => ({
        [field]: new RegExp(searchTerm, 'i'),
      })),
    })
  }

  if (Object.keys(filterFields).length) {
    const fieldConditions = Object.entries(filterFields).map(([key, value]) => {
      const values = Array.isArray(value) ? value : [value]
      return {
        $or: values.map(fieldValue => ({ [key]: fieldValue })),
      }
    })

    andConditions.push({
      $and: fieldConditions,
    })
  }

  const whereCondition = andConditions.length ? { $and: andConditions } : {}

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper(paginationOption)

  const sortCondition: { [key: string]: SortOrder } = {}

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder
  }

  const result = await BookModel.find(whereCondition)
    .populate('publishedBy')
    .sort(sortCondition)
    .skip(skip)
    .limit(limit as number)
  const total = await BookModel.countDocuments()

  const responseData = {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }

  return responseData
}

export const BookService = {
  createBook,
  getAllBooks,
}
