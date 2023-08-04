import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import ApiError from '../../../errors/ApiError'
import httpStatus from 'http-status'
import { sendSuccessResponse } from '../../../shared/customResponse'
import UserModel from '../user/user.model'
import { CompleteListService } from './completeList.service'

const addToCompleteList = catchAsync(async (req: Request, res: Response) => {
  const completeListData = req.body
  const user = req.user
  if (!user) throw new ApiError(httpStatus.UNAUTHORIZED, 'User not found')
  const isUserExist = await UserModel.isUserExist(user.email)
  if (!isUserExist)
    throw new ApiError(httpStatus.UNAUTHORIZED, 'User not found')

  completeListData.userId = isUserExist._id

  const completeList = await CompleteListService.addToCompleteList(
    completeListData
  )
  const responseData = {
    message: 'Book added to completed list successfully',
    data: completeList,
  }
  sendSuccessResponse(res, responseData)
})

const getCompleteListOfUser = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user
    if (!user) throw new ApiError(httpStatus.UNAUTHORIZED, 'User not found')
    const isUserExist = await UserModel.isUserExist(user.email)
    if (!isUserExist)
      throw new ApiError(httpStatus.UNAUTHORIZED, 'User not found')

    const completeList = await CompleteListService.getCompleteListOfUser(
      isUserExist._id as string
    )
    const responseData = {
      message: 'Completed list fetched successfully',
      data: completeList,
    }
    sendSuccessResponse(res, responseData)
  }
)

export const CompleteListController = {
  addToCompleteList,
  getCompleteListOfUser,
}
