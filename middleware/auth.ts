import { Response } from 'express'
import { Request } from 'express'

interface AuthRequest extends Request {
    isAuthenticated(): boolean
    logout(): void
}

module.exports = {
    ensureAuth: function (req: AuthRequest, res: Response, next: () => any) {
        if (req.isAuthenticated()) {
            return next()
        } else {
            res.status(401).json('Not authorized! Please log in.')
        }
    },
}
