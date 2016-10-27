var express = require('express')
var router = express.Router()
var passport = require ('passport')
var User = require('../models/users')
var Shopping = require('../models/shoppingsites')
var Review = require('../models/reviews')

// router.get('/signup', function (req, res) {
//   // console.log("check: " + req.flash('signinMessage'))
//   res.render('signup/new', {title: 'SignUp Page', message: req.flash('signinMessage')})
// })


function authCheck(req,res,next){
//res.send(req.isAuthenticated())
// if request is authenticated is false, then let it be
// if its true, redirect back to profile
if(req.isAuthenticated()){

req.flash('signupMsg','you have logged in')
 return res.redirect('/users/dashboard')

} else {
  return next()
}
}

router.route('/signup')
      .get(authCheck, function (req,res){
          res.render('signup/new', {title: 'SignUp Page', message: req.flash('signupMessage')})
        }).post(passport.authenticate('local-signup', {
            successRedirect : '/users/dashboard', // redirect to the secure profile section
            failureRedirect : '/users/signup', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

router.route('/signin')
      .get(authCheck, function (req, res) {
        res.render('signin/index', { message: req.flash('loginMessage') })
      })
      .post(passport.authenticate('local-login', {
        successRedirect: '/users/dashboard',
        failureRedirect: '/users/signin',
        failureFlash: true
      }))






// old code

// router.post('/signup', function (req, res) {
//
//
//   var newUser = new User({
//     local: {
//       firstname: req.body.user.local.firstname,
//       lastname: req.body.user.local.lastname,
//       username: req.body.user.local.username,
//       email: req.body.user.local.email,
//       password: req.body.user.local.password
//     }
//   })
//
//   // save the user that is being created
//   newUser.save(function (err) {
//     if (err) throw new Error(err)
//   })
//   // send the data that user inputs in all fields
//   res.send(req.body)
//   res.redirect('/thankyou')
// })
//
// //


//displaying in list of users page
router.get('/signup/listofusers', function (req, res) {
  // this will find all from the created Animal constructor
  User.find({}, function (err, allUsers) {
    res.render('signup/listofusers', {usersArr: allUsers})
  })
})




// sign in start here


router.route('/signin')
      .get(authCheck, function (req,res){
          res.render('signin/index', {title: 'SignIn Page', message: req.flash('loginMessage')})
        }).post(passport.authenticate('local-login', {
            successRedirect : '/users/dashboard', // redirect to the secure profile section
            failureRedirect : '/users/signin', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));


// router.post('/signin', function (req, res, next) {
//   var user = req.body.user
//
//   User.findOne({ 'local.username': user.local.username }, function (err, foundUser) {
//     if (err) res.send(err.message)
//
//     if (foundUser) {
//       foundUser.authenticate(user.local.password, function (err, authenticated) {
//         if (err) res.send(err)
//
//         if (authenticated) {
//           req.flash('loginMessage', 'lets go in!')
//           res.redirect('/users/dashboard')
//         } else {
//           req.flash('loginMessage', 'boo! not found')
//           res.redirect('/users/signup')
//         }
//       })
//     } else {
//       // if application cannot find user by email
//       req.flash('loginMessage', 'boo! not found!')
//       res.redirect('/users/signup')
//     }
//   })
//
//
//
// })


//
// if (err) res.send(err.message)
//
// if (foundUser){
//   foundUser.authenticate(req.body.user.local.password,function (err,authenticated){
//     console.log('test')
//     if (err) res.send(err)
//     if (authenticated) {
//       //should go to profile page plus welcome user
//       res.send('user email ans password found in the database')
//     } else {
//       //should redirect to login page
//       res.send('user email and password not found in database')
//     }
//   })
//
// } else {
//
// }
//end of old sign in

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

//after loggin in, display the username

router.get('/dashboard', isLoggedIn,  function  (req, res, next) {
    Shopping.find({}, function (err, shops) {
    res.render('profile/index', {message: req.flash('signupMsg'), username : req.user.local.username, shopArr:shops, authUser: req.user })


})

})




router.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');

    });




module.exports = router
