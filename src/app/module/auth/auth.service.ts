import httpStatus from 'http-status'
import config from '../../../config'
import ApiError from '../../../errors/ApiError'
import hashPassword from '../../helpers/hashPassword'
import { IUser } from '../user/user.interface'
import UserModel from '../user/user.model'
import { IJwtPayload, IUserResponse } from './auth.interface'
import jwt from 'jsonwebtoken'
import checkPassword from '../../helpers/checkPassword'

const signupUser = async (userData: IUser): Promise<IUserResponse> => {
  const { password, ...rest } = userData
  const { email } = userData

  const isUserExist = await UserModel.isUserExist(email)
  if (isUserExist)
    throw new ApiError(httpStatus.BAD_REQUEST, 'User already exist')

  const accessToken = jwt.sign({ email }, config.access_token as string, {
    expiresIn: '1d',
  })

  const hashedPassword = await hashPassword(password)
  const user = await UserModel.create({
    password: hashedPassword,
    ...rest,
  })
  if (!user) throw new ApiError(httpStatus.BAD_REQUEST, 'User creation failed')

  return { accessToken, data: user }
}

const loginUser = async (userData: IUser): Promise<IUserResponse> => {
  const { password, email } = userData

  const user = await UserModel.findOne({ email }).select('+password')

  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User not found')
  }

  const isPasswordMatch = await checkPassword(password, user.password)
  if (!isPasswordMatch)
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid password')

  const accessToken = jwt.sign({ email }, config.access_token as string, {
    expiresIn: '1d',
  })

  return { accessToken, data: { email: user.email } }
}

const loggedInUser = async (token: string): Promise<IUser> => {
  const decodedToken = jwt.verify(
    token,
    config.access_token as string
  ) as IJwtPayload

  const email = decodedToken.email
  const user = await UserModel.findOne({ email }).select({
    updatedAt: 0,
    createdAt: 0,
    __v: 0,
  })
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found')

  return user
}

export const AuthService = {
  signupUser,
  loginUser,
  loggedInUser,
}
