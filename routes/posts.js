import express from 'express'
import { getPost, getPosts, addPost, deletePost } from '../controllers/post.js'

const router = express.Router()
router.get('/find/:id', getPost)
router.get('/', getPosts)
router.post('/', addPost)
router.delete('/:id', deletePost)

export default router
