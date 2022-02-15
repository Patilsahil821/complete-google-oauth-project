const express = require("express")
const passport = require("passport")
const router = express.Router()

router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
)

router.get(
  "/google/redirect",
  passport.authenticate("google", {
    failureRedirect: "/",
    successRedirect: "/profile"
  })
)

module.exports = router
