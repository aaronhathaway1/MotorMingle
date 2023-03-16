import { Request, Response, NextFunction } from 'express';
const session = require('express-session');
const passport = require('passport');

const express = require('express');
const router = express.Router();

 

/*****
 * ADDED ERROR ISSUES
 */


interface AuthRequest extends Request {
  isAuthenticated(): boolean;
  logout(): void;
}



// @desc    Auth with Google
// @route   GET /auth/google
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile'],
  })
);
// @desc    Google auth callback
// @route   GET /auth/google/callback
router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/',
  }),
  (req: Request, res:Response) => {
    res.send('Logged in as ' + req.params.firstName + ' ' + req.params.lastName);
  }
);


// @desc    Logout user
// @route   /auth/logout
router.get('/logout', (req: AuthRequest, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
      req.logout();
      res.json({ success: true });
    } else {
      res.status(401).json('Not authorized! Please log in.');
    }
  });
module.exports = router;