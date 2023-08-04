import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import { AuthService } from './auth.service'
import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { sendSuccessResponse } from '../../../shared/customResponse'

const signupUser = catchAsync(async (req: Request, res: Response) => {
  const userData = req.body
  const user = await AuthService.signupUser(userData)

  const { accessToken } = user
  res
    .header('Authorization', `Bearer ${accessToken}`)
    .header('Access-Control-Expose-Headers', 'Authorization')
    .json({
      message: 'Otp sent! Check your email for verification code',
      success: true,
      statusCode: httpStatus.CREATED,
    })
})

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const userData = req.body
  const user = await AuthService.loginUser(userData)

  const { accessToken, data } = user
  res
    .header('Authorization', `Bearer ${accessToken}`)
    .header('Access-Control-Expose-Headers', 'Authorization')
    .json({
      message: 'User logged in successfully',
      data,
      success: true,
      statusCode: httpStatus.OK,
    })
})

const loggedInUser = catchAsync(async (req: Request, res: Response) => {
  const authorizationHeader = req.headers.authorization
  if (!authorizationHeader) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Please provide a token')
  }

  const token = authorizationHeader.split(' ')[1]
  const user = await AuthService.loggedInUser(token as string)

  const responseData = {
    data: user,
    message: 'User retrieved successfully',
  }
  sendSuccessResponse(res, responseData)
})

export const AuthController = {
  signupUser,
  loginUser,
  loggedInUser,
}
