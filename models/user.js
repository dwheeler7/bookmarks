require('dotenv').config()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const passwordValidator = require('password-validator');

const passwordSchema = new passwordValidator()
passwordSchema
.is().min(8)                                    // Minimum length 8
.is().max(100)                                  // Maximum length 100
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits(2)                                // Must have at least 2 digits
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123']) // Blacklist these values

const userSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bookmark' }]
})



userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        // validate password
        const passVal = passwordSchema.validate(this.password, { list: true })
        if (passVal.length) {
            console.log(passVal)
            throw new Error((passVal))
        }
        this.password = await bcrypt.hash(this.password, 8) // encrypt      
    }
    next()
  })

  userSchema.methods.generateAuthToken = async function() {
    const token = jwt.sign({ _id: this._id }, process.env.SECRET)
    return token
  }

  const User = mongoose.model('User', userSchema)

module.exports = User