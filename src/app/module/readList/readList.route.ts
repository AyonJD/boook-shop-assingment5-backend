import express from 'express'
import verifyToken from '../../middlewares/verifyToken'
import { ReadListController } from './readList.controller'

const router = express.Router()

router.post('/', verifyToken, ReadListController.addToReadList)
router.get('/', verifyToken, ReadListController.getReadListOfUser)

export const ReadListRoute = router
