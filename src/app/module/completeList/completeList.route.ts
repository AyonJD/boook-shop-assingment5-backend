import express from 'express'
import verifyToken from '../../middlewares/verifyToken'
import { CompleteListController } from './completeList.controller'

const router = express.Router()

router.post('/', verifyToken, CompleteListController.addToCompleteList)
router.get('/', verifyToken, CompleteListController.getCompleteListOfUser)

export const CompleteListRoute = router
