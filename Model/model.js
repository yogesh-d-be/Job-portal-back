const mongoose = require ('mongoose')
const userData = new mongoose.Schema({
    
      name: {
        type: String,
      },
      email: {
        type: String,
      },
      password: {
        type: String,
      },
      MobileNumber: {
        type: Number,
      }
})

const userDB = mongoose.model("job portal user",userData)
module.exports= userDB;