var mongoose = require('mongoose')

var bcrypt = require('bcrypt')


var userSchema = mongoose.Schema({
  local: {
    firstname: {
      type: String
    },
    lastname: {
      type: String
    },
    email: {
      type: String,
      required: true
    },
    username: {
      type: String
    },
    password: {
      type: String,
      required: true
    }
  }
})

userSchema.pre('save', function (next) {
  console.log('before save hash the password')
  console.log(this)

  var user = this

  bcrypt.genSalt(5, function (err, salt) {
    if (err) return next(err)

    bcrypt.hash(user.local.password, salt, function (err, hash) {
      if (err) return next(err)

      user.local.password = hash
      console.log('after hash')
      console.log(user)
      next()
    })
  })
})

userSchema.post('save', function () {})
// console.log('after the save, save successful')

// this is call instance method
userSchema.methods.auth = function (password, callback) {
  console.log('given password is' + password)
  console.log('local password is' + this.local.password)

  var hashedPassword = this.local.password

  bcrypt.compare(password, hashedPassword, function (err, isMatch) {
    callback(err, isMatch)
  })
}

var User = mongoose.model('User', userSchema)

// to authenticate
userSchema.methods.sayName = function () {
  console.log('hey i can call say name from an instance') // refer to user
  console.log('my email is' + this.local.email)
  console.log('my password is' + this.local.password)
}

userSchema.methods.authenticate = function (password, callback) {
  bcrypt.compare(password, this.local.password, function (err, isMatch) {})
}

module.exports = User
