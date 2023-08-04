import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import ReadListModel from './readList.model'
import { IReadList } from './readList.interface'

const addToReadList = async (readListData: IReadList) => {
  const { bookId, userId } = readListData
  const isExistReadList = await ReadListModel.existingReadList(userId)

  let readList
  if (isExistReadList) {
    readList = await ReadListModel.findOneAndUpdate(
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
    readList = (await ReadListModel.create(readListData)).populate([
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

  if (!readList)
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Something went wrong while adding book to read list'
    )

  return readList
}

const getReadListOfUser = async (userId: string) => {
  const readList = await ReadListModel.findOne({ userId }).populate([
    {
      path: 'bookId',
      model: 'Book',
    },
    {
      path: 'userId',
      model: 'User',
    },
  ])
  if (!readList) throw new ApiError(httpStatus.NOT_FOUND, 'Read List not found')
  return readList
}

export const ReadListService = {
  addToReadList,
  getReadListOfUser,
}
