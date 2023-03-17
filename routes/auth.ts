import { Request, Response } from 'express'
const passport = require('passport')

const express = require('express')
const router = express.Router()

interface AuthRequest extends Request {
    isAuthenticated(): boolean
    logout(): void
}

// @desc    Auth with Google
// @route   GET /auth/google
router.get(
    '/google',
    passport.authenticate('google', {
        scope: ['email', 'profile'],
    })
)
// @desc    Google auth callback
// @route   GET /auth/google/callback
router.get(
    '/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/',
    }),
    (req: Request, res: Response) => {
        res.send(`Logged in as ${req.user}`)
    }
)

// @desc    Logout user
// @route   /auth/logout
router.get('/logout', (req: AuthRequest, res: Response) => {
    if (req.isAuthenticated()) {
        req.logout()
        res.json({ success: true })
    } else {
        res.status(401).json('Not authorized! Please log in.')
    }
})
module.exports = router
