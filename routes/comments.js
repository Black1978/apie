import express from 'express'
import { getComment } from '../controllers/comment.js'
import { getComments } from '../controllers/comment.js'
import { addComment } from '../controllers/comment.js'

const router = express.Router()
router.get('/find/:id', getComment)
router.get('/', getComments)
router.post('/', addComment)

export default router