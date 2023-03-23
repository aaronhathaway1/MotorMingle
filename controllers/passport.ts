import passport from 'passport'
import { Strategy as GoogleStrategy, Profile } from 'passport-google-oauth20'
import 'mongoose'

const Person = require('../models/person')

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID ?? '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
            callbackURL: '/auth/google/callback',
        },
        async (
            accessToken: string,
            refreshToken: string,
            profile: Profile,
            done: any
        ) => {
            const person = await Person.findOne({ googleId: profile.id })
            if (!person) {
                const newPerson = await Person.create({
                    googleId: profile.id,
                    firstName: profile.name?.givenName,
                    lastName: profile.name?.familyName,
                    email: profile.emails?.[0].value,
                })
                if (newPerson) {
                    done(null, newPerson)
                }
            } else {
                done(null, person)
            }
        }
    )
)

passport.serializeUser((person: typeof Person, done: any) => {
    done(null, person.id)
})

passport.deserializeUser(async (id: String, done: any) => {
    const person = await Person.findById(id)
    done(null, person)
})
