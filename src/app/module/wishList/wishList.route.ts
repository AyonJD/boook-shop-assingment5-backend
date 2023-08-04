import express from 'express'
import verifyToken from '../../middlewares/verifyToken'
import { WishListController } from './wishList.controller'

const router = express.Router()

router.post('/', verifyToken, WishListController.addToWishList)
router.get('/', verifyToken, WishListController.getWishListOfUser)

export const WishListRoute = router
