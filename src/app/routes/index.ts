import express from 'express'
import { AuthRoute } from '../module/auth/auth.route'

const router = express.Router()

const routes = [
  {
    path: '/auth',
    route: AuthRoute,
  },
]

routes.forEach(route => {
  router.use(route.path, route.route)
})

export default router
