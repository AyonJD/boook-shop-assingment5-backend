import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import { BookService } from './book.service'
import { sendSuccessResponse } from '../../../shared/customResponse'
import pick from '../../../shared/pick'
import { BOOK_FILTER_FIELDS } from './book.constant'
import { IPaginationOption } from '../../../interfaces/sharedInterface'
import { paginationFields } from '../../../constant/shared.constant'
import httpStatus from 'http-status'

const createBook = catchAsync(async (req: Request, res: Response) => {
  const bookData = req.body
  const book = await BookService.createBook(bookData)
  const responseData = {
    data: book,
    message: 'Book created successfully',
  }
  sendSuccessResponse(res, responseData)
})

const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.query, ['searchTerm', ...BOOK_FILTER_FIELDS])
  const paginationOption: IPaginationOption = pick(req.query, paginationFields)

  const books = await BookService.getAllBooks(filter, paginationOption)
  const responseData = {
    statusCode: httpStatus.OK,
    meta: books.meta || {},
    data: books.data || [],
    message: 'All Book fetched successfully',
  }

  sendSuccessResponse(res, responseData)
})

export const BookController = {
  createBook,
  getAllBooks,
}
