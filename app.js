const express = require("express")
const ejs = require("ejs")
require("dotenv").config()
const app = express()
const mongoose = require("mongoose")
const authRouter = require("./routes/authRoutes")
const session = require("express-session")
const passport = require("passport")

mongoose.connect(process.env.URL).then((res) => {
  console.log("connected with mongodb.")
})

//make sure all passport related things should be above....
require("./config/passportAuth")

app.set("view engine", "ejs")
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SECRET,
    cookie: {
      maxAge: 1 * 1000 * 60 * 60 * 24
    }
  })
)
app.use(passport.initialize())
app.use(passport.session())
app.use((req, res, next) => {
  console.log(req.session)
  console.log(req.user)
  next()
})
app.use("/auth", authRouter)

app.get("/", (req, res) => {
  res.render("login.ejs")
})

app.get(
  "/profile",
  (req, res, next) => {
    if (req.user) {
      next()
    } else {
      res.send(`you are not authorized <a href="/auth/google"> login </a>`)
    }
  },
  (req, res) => {
    res.render("profile", { user: req.user })
  }
)

app.get("/logout", (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect("/")
})

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`server is running on ${port}`)
})
