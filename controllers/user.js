import { db } from '../connect.js'
import jwt from 'jsonwebtoken'

export const getUser = (req, res) => {
    const userId = req.params.id
    const q = 'SELECT * FROM users WHERE id=?'
    db.query(q, [userId], (err, data) => {
        if (err) return res.status(500).json(err)
        const { password, ...info } = data[0]
        return res.status(201).json(info)
    })
}
export const updateUser = (req, res) => {
    const token = req.cookies.accessToken
    if (!token) return res.status(401).json('Not logged in!')
    jwt.verify(token, 'sekretkey', (err, userInfo) => {
        if (err) return res.status(403).json('Token is not valid!')
        const q =
            'UPDATE users SET `city`=?, `website`=?, `profilePic`=?, `coverPic`=? WHERE id=?'
        db.query(
            q,
            [
                req.body.city,
                req.body.website,
                req.body.profilePic,
                req.body.coverPic,
                userInfo.id
            ],
            (err, data) => {
                if (err) return res.status(500).json(err)
                if (data.affectedRows > 0) return res.json('Updated!')
                return res.status(403).json('You can update only your profile!')
            }
        )
    })
}
