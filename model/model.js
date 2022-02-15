const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  googleId: String,
  name: String
})

const User = new mongoose.model("user", userSchema)

module.exports = User
