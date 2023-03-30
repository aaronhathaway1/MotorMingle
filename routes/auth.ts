import { Request, Response, NextFunction } from 'express'
const passport = require('passport')

const express = require('express')
const router = express.Router()

interface AuthRequest extends Request {
    isAuthenticated(): boolean
    logout(): void
}

router.get(
    '/google',
    passport.authenticate('google', {
        scope: ['email', 'profile'],
    })
)

router.get(
    '/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/',
    }),
    (req: Request, res: Response) => {
        res.send(`Logged in as ${req.user}`)
    }
)

router.get('/logout', (req: AuthRequest, res: Response, next: NextFunction) => {
    // @ts-ignore
    req.logout((err) => {
        if (err) {
            res.status(500)
            return next(err)
        } else {
            res.status(200).json({ success: true })
        }
    })
})
module.exports = router
