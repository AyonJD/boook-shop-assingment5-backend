import express from 'express'
import { BookController } from './book.controller'
import verifyToken from '../../middlewares/verifyToken'

const router = express.Router()

router.post('/', verifyToken, BookController.createBook)
router.get('/', BookController.getAllBooks)
router.get('/:bookId', BookController.getBookById)
router.patch('/:bookId', verifyToken, BookController.updateBookById)
router.delete('/:bookId', verifyToken, BookController.deleteBook)

export const BookRoute = router
