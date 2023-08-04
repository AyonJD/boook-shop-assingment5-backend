import { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from '../../config'
import ApiError from '../../errors/ApiError'
import httpStatus from 'http-status'
import UserModel from '../module/user/user.model'

declare module 'express' {
  interface Request {
    user?: JwtPayload
  }
}

export default async function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const token = req.headers.authorization?.split(' ')[1] || ''

  try {
    if (!token) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Token not found')
    }

    const decoded = jwt.verify(
      token,
      config.access_token as string
    ) as JwtPayload

    // Verify if the token is expired
    const currentTimestamp = Math.floor(Date.now() / 1000)
    if (decoded.exp && decoded.exp < currentTimestamp) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Token has expired')
    }

    const email = decoded.email
    const user = await UserModel.findOne({ email })
    if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'Invalid token')

    req.user = decoded
    next()
  } catch (error) {
    next(error)
  }
}
