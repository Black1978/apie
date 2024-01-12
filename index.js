import express from 'express'
import userRouter from './routes/users.js'
import postRouter from './routes/posts.js'
import commentRouter from './routes/comments.js'
import likeRouter from './routes/likes.js'
import authRouter from './routes/auth.js'
import relationshipsRouter from './routes/relationships.js'
import multer from 'multer'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import filesPayloadExists from './middleware/filesPayloadExists.js'
import fileExtLimiter from './middleware/fileExtLimiter.js'
import fileSizeLimiter from './middleware/fileSizeLimiter.js'

import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', true)
    next()
})
app.use(express.json())
const corsConfig = {
    origin: true,
    credentials: true,
}
app.use(cors(corsConfig))
app.use(cookieParser())

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../public')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    },
})

const upload = multer({ storage: storage })

app.post(
    '/api/upload',
    upload.single('file'),
    (req, res) => {
        const file = req.file
        res.status(200).json(file.filename)
    }
)
// app.post(
//     '/api/upload',
//     fileUpload({ createParentPath: true }),
//     fileExtLimiter(['.png', '.jpg', '.jpeg']),
//     fileSizeLimiter,
//     function (req, res) {
//         const files = req.files
//         let filename
//         Object.keys(files).forEach((key) => {
//             filename = Date.now() + files[key].name
//             const filepath = path.join(__dirname, '..', 'public', 'pictures', filename)
//             files[key].mv(filepath, (err) => {
//                 if (err) return res.status(500).json({ status: 'error', message: err })
//             })
//         })
//         res.status(200).json(filename)
//     }
// )

app.use('/api/users', userRouter)
app.use('/api/posts', postRouter)
app.use('/api/comments', commentRouter)
app.use('/api/likes', likeRouter)
app.use('/api/auth', authRouter)
app.use('/api/relationships', relationshipsRouter)

app.use(express.static(path.join(__dirname, '..', '/public')))

app.listen(process.env.PORT, () => {
    console.log('API working!')
})
