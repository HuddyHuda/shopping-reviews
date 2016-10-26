var express = require('express')
var app = express()
var Shopping = require('./models/shoppingsites')
var LocalStrategy = require('passport-local').Strategy
var layout = require('express-ejs-layouts')
var bodyParser = require('body-parser')
var morgan = require('morgan')
var session = require('express-session')
var MongoStore = require('connect-mongo')(session)



var flash = require('connect-flash')

var passport = require('passport')

var dotenv = require('dotenv')
var port = process.env.PORT || 4000 // for heroku

var mongoose = require('mongoose')
mongoose.Promise = global.Promise

dotenv.load({ path: '.env.' + process.env.NODE_ENV })
mongoose.connect(process.env.MONGO_URI)

// moongoose.connect('mongodb://localhost/user-datas')

// app.use(logger('dev'))
app.use(bodyParser.urlencoded({ extended: true }))

require('./config/passport')(passport)







// app.set('views', path.join(__dirname, 'views'))
app.use(layout)
app.use(morgan('dev'))

app.use(session({
  secret: process.env.EXPRESS_SECRET,
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({
    url: process.env.MONGO_URI,
    autoReconnect: true
  })
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

app.use(express.static(__dirname + '/public'))

app.engine('ejs', require('ejs').renderFile)
app.set('view engine', 'ejs')

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err
    })
  })
}

app.listen(port)

console.log('Server running at http://localhost:' + port)

var user_routes = require('./routes/users')
app.use('/users', user_routes)

var shopping_routes = require ('./routes/shoppingsites')
app.use('/shoppingsites', shopping_routes)

var reviewRoutes = require ('./routes/reviews')
app.use('/reviews', reviewRoutes)

app.use(bodyParser.urlencoded({
  extended: true
}))


app.get('/', function (req, res) {
  Shopping.find({}, function(err, shops){
      res.render('homepage/main', {shopArr: shops})
    })
  })


// hardcoded values







// to parse form submitted data

// var signup_routes = require('./routes/signup')
// app.use('/signup', signup_routes)
//
// var signin_routes = require('./routes/signin')
// app.use('/signin', signin_routes)
//
// var profile_routes = require('./routes/profile')
// app.use('/profile', profile_routes)

// ############ YOU CAN ADD YOUR CODE BELOW
