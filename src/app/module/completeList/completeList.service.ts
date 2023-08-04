import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { ICompleteList } from './completeList.interface'
import CompleteListModel from './completeList.model'
import mongoose from 'mongoose'
import ReadListModel from '../readList/readList.model'

const addToCompleteList = async (completeListData: ICompleteList) => {
  const { bookId, userId } = completeListData
  const isExistCompleteList = await CompleteListModel.existingCompleteList(
    userId
  )

  let completeList
  const session = await mongoose.startSession()

  try {
    session.startTransaction()
    if (isExistCompleteList) {
      completeList = await CompleteListModel.findOneAndUpdate(
        { userId },
        { $push: { bookId } },
        { new: true }
      ).populate([
        {
          path: 'bookId',
          model: 'Book',
        },
        {
          path: 'userId',
          model: 'User',
        },
      ])
    } else {
      completeList = (
        await CompleteListModel.create(completeListData)
      ).populate([
        {
          path: 'bookId',
          model: 'Book',
        },
        {
          path: 'userId',
          model: 'User',
        },
      ])
    }

    // Remove the book from the read list
    const readListOfUser = await ReadListModel.existingReadList(userId)
    if (!readListOfUser)
      throw new ApiError(httpStatus.NOT_FOUND, 'Read List not found')

    if (readListOfUser.bookId.length > 0) {
      readListOfUser.bookId = readListOfUser.bookId.filter(
        book => book.toString() !== bookId.toString()
      )
    }

    await ReadListModel.findOneAndUpdate(
      { userId },
      { bookId: readListOfUser.bookId },
      { new: true }
    ).populate([
      {
        path: 'bookId',
        model: 'Book',
      },
      {
        path: 'userId',
        model: 'User',
      },
    ])

    await session.commitTransaction()
    session.endSession()
  } catch (error) {
    await session.abortTransaction()
    session.endSession()
    throw error
  }

  if (!completeList)
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Something went wrong while adding book to complete list'
    )

  return completeList
}

const getCompleteListOfUser = async (userId: string) => {
  const completeList = await CompleteListModel.findOne({ userId }).populate([
    {
      path: 'bookId',
      model: 'Book',
    },
    {
      path: 'userId',
      model: 'User',
    },
  ])
  if (!completeList)
    throw new ApiError(httpStatus.NOT_FOUND, 'Complete List not found')
  return completeList
}

export const CompleteListService = {
  addToCompleteList,
  getCompleteListOfUser,
}
