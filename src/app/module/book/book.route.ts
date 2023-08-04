import express from 'express'
import { BookController } from './book.controller'
import verifyToken from '../../middlewares/verifyToken'

const router = express.Router()

router.post('/', verifyToken, BookController.createBook)
router.get('/', BookController.getAllBooks)
router.get('/:bookId', BookController.getBookById)
router.patch('/:bookId', verifyToken, BookController.updateBookById)

export const BookRoute = router
