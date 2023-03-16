const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

require('mongoose');

module.exports = function (passport: { use: (arg0: any) => 
    void; serializeUser: (arg0: (user: any, done: any) => void)
     => void; deserializeUser: (arg0: (id: any, done: any) => void) => void; }) {
  passport.use(new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback',
      },
      async (accessToken: any, refreshToken: any, profile:
         { id: any; displayName: any; name: { givenName: any; familyName: any; }; },
          done: (arg0: null, arg1: any) => void) => {
        const newUser = {
          googleId: profile.id,
          displayName: profile.displayName,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
        };
        try {
          let user = await User.findOne({ googleId: profile.id });
          if (user) {
            done(null, user);
          } else {
            user = await User.create(newUser);
            done(null, user);
          }
        } catch (err) {
          console.error(err);
        }
      }
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    User.findById(id, (err: any, user: any) => done(err, user));
  });
};