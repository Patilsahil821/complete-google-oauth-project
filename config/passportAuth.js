const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth2").Strategy
const User = require("../model/model")

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENTID,
      clientSecret: process.env.CLIENTSECRET,
      callbackURL: "/auth/google/redirect",
      passReqToCallback: true
    },
    (request, accessToken, refreshToken, profile, done) => {
      console.log("hitted....")
      User.findOne({ googleId: profile.id }, (err, user) => {
        if (err) return null, false
        if (user) return done(null, user)
        if (!user) {
          const createuser = new User({
            googleId: profile.id,
            name: profile.given_name
          })

          createuser.save(() => {
            return done(null, createuser)
          })
        }
      })
    }
  )
)

passport.serializeUser((user, done) => {
  console.log("serlize user")
  done(null, user._id)
})
passport.deserializeUser((id, done) => {
  console.log("desearlize user")
  User.findById(id, (err, user) => {
    done(err, user)
  })
})
