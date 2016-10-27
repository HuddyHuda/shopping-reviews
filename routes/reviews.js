

var Shopping = require('../models/shoppingsites')
var Review = require('../models/reviews')
var User = require('../models/users')

var express = require('express')
var router = express.Router()







router.get('/', function  (req, res) {
    res.render('reviews/new')

})


router.get('/findit', function (req, res) {



  Review.find({postedBy: req.user.id}, function (err, foundallthereview) {
    if (err) console.log(err)

      res.render('reviews/eachuser', {
        foundallthereview: foundallthereview,
        username : req.user.local.username
      })



    //res.send(foundallthereview)
  })



})




router.get('/:id', function (req, res) {
  Review.findById(req.params.id, function (err, review) {
    if (err) console.log(err)
    // foundone review res.send(review)

    res.render('reviews/individual', {
      review: review,
      authUser: req.user,
      checkley: req.user.id
    })
})
})

router.get('/:id/edit', function (req,res){
  Review.findById(req.params.id, function (err, foundReview) {
  res.render('shoppingsites/individualedit', {
  foundReview: foundReview,
  authUser: req.user,
  checkley: req.user.id
  })

})
})


router.post('/:id/edit', function (req, res) {

Review.findById(req.params.id, function (err, foundReview) {

foundReview.rating = req.body.rating
foundReview.comments = req.body.comments
foundReview.postedBy = req.user


foundReview.save(function (err, newerReview) {
res.redirect('/shoppingsites/' + foundReview.shopping_id)
  })
  })
})


router.get('/:id/delete', function (req,res){

Review.findByIdAndRemove(req.params.id, function (err, foundReview) {
    if (err) console.log(err)

  res.redirect('/shoppingsites/' + foundReview.shopping_id)
})

})











// router.post('/:shopping_id/edit', function (req, res) {
//
//  foundReview.rating = req.body.rating
//  foundReview.comments = req.body.comments
//
//
//   newReview.save(function (err, newerReview) {
//     res.redirect('/shoppingsites/' + newReview.shopping_id)
//   })
// })




module.exports = router
