import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import ApiError from '../../../errors/ApiError'
import httpStatus from 'http-status'
import { sendSuccessResponse } from '../../../shared/customResponse'
import UserModel from '../user/user.model'
import { ReadListService } from './readList.service'

const addToReadList = catchAsync(async (req: Request, res: Response) => {
  const readListData = req.body
  const user = req.user
  if (!user) throw new ApiError(httpStatus.UNAUTHORIZED, 'User not found')
  const isUserExist = await UserModel.isUserExist(user.email)
  if (!isUserExist)
    throw new ApiError(httpStatus.UNAUTHORIZED, 'User not found')

  readListData.userId = isUserExist._id

  const readList = await ReadListService.addToReadList(readListData)
  const responseData = {
    message: 'Book added to read list successfully',
    data: readList,
  }
  sendSuccessResponse(res, responseData)
})

const getReadListOfUser = catchAsync(async (req: Request, res: Response) => {
  const user = req.user
  if (!user) throw new ApiError(httpStatus.UNAUTHORIZED, 'User not found')
  const isUserExist = await UserModel.isUserExist(user.email)
  if (!isUserExist)
    throw new ApiError(httpStatus.UNAUTHORIZED, 'User not found')

  const readList = await ReadListService.getReadListOfUser(
    isUserExist._id as string
  )
  const responseData = {
    message: 'Read list fetched successfully',
    data: readList,
  }
  sendSuccessResponse(res, responseData)
})

export const ReadListController = {
  addToReadList,
  getReadListOfUser,
}
