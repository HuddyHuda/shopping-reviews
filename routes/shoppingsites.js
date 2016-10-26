var Shopping = require('../models/shoppingsites')
var Review = require('../models/reviews')
var User = require('../models/users')
var mongoose = require('mongoose')

var express = require('express')
var router = express.Router()

router.get('/', function (req, res) {
  Shopping.find({}, function (err, shops) {
    res.render('homepage/index', {shopArr: shops})
  })
})

router.get('/:id', function (req, res) {
  Shopping.findById(req.params.id, function (err, shop) {
    if (err) console.log(err)

    Review.find({shopping_id: req.params.id})
      .populate('postedBy')
      .exec(function (err, reviews) {
        //res.send(reviews)
        if (err) console.log(err)
        console.log(reviews)

        // res.send(reviews)

        // console.log(req.user.local.username)

        // res.send(req.user)
        res.render('shoppingsites/individual', {
          shop: shop,
          reviewsArr: reviews,
          authUser: req.user
        })
      })
  })

  //  res.send(shops)

})

router.post('/:shopping_id', function (req, res) {
  var newReview = new Review({
    rating: req.body.rating,
    comments: req.body.comments,
    postedBy: req.user.id,
    shopping_id: req.params.shopping_id
  })

  newReview.save(function (err, savedReview) {
  res.redirect('/shoppingsites/' + newReview.shopping_id)
  })
})








//
// router.post('/:shopping_id/edit', function (req,res){
//   Review.findById(id, function (err, tank) {
//   if (err) return handleError(err);
//
//   newReview.rating = req.body.rating
//   newReview.comments = req.body.comments
//
//   Review.save(function (err, updatedReview) {
//     if (err) return handleError(err);
//     res.send(updatedReview);
//   });
// });
//
// })







module.exports = router
