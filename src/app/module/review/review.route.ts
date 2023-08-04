import express from 'express'
import { ReviewController } from './reviewController'
import verifyToken from '../../middlewares/verifyToken'

const router = express.Router()

router.post('/', verifyToken, ReviewController.createReview)
router.get('/:bookId', ReviewController.getReviewOfBook)

export const ReviewRoute = router
