import express from 'express'
import { AuthRoute } from '../module/auth/auth.route'
import { BookRoute } from '../module/book/book.route'
import { WishListRoute } from '../module/wishList/wishList.route'

const router = express.Router()

const routes = [
  {
    path: '/auth',
    route: AuthRoute,
  },
  {
    path: '/book',
    route: BookRoute,
  },
  {
    path: '/wishList',
    route: WishListRoute,
  },
]

routes.forEach(route => {
  router.use(route.path, route.route)
})

export default router
