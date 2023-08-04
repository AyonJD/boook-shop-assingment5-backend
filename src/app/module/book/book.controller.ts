import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import { BookService } from './book.service'
import { sendSuccessResponse } from '../../../shared/customResponse'
import pick from '../../../shared/pick'
import { BOOK_FILTER_FIELDS } from './book.constant'
import { IPaginationOption } from '../../../interfaces/sharedInterface'
import { paginationFields } from '../../../constant/shared.constant'
import httpStatus from 'http-status'
import { JwtPayload } from 'jsonwebtoken'

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

const getBookById = catchAsync(async (req: Request, res: Response) => {
  const bookId = req.params.bookId
  const book = await BookService.getBookById(bookId)
  const responseData = {
    data: book,
    message: 'Book fetched successfully',
  }
  sendSuccessResponse(res, responseData)
})

const updateBookById = catchAsync(async (req: Request, res: Response) => {
  const bookId = req.params.bookId
  const bookData = req.body
  const user = req.user
  const book = await BookService.updateBookById(
    bookId,
    bookData,
    user as JwtPayload
  )
  const responseData = {
    data: book,
    message: 'Book updated successfully',
  }
  sendSuccessResponse(res, responseData)
})

export const BookController = {
  createBook,
  getAllBooks,
  getBookById,
  updateBookById,
}
