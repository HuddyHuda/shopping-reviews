var mongoose = require('mongoose')

var reviewSchema = new mongoose.Schema({
    rating: Number,
    comments: String,
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    shopping_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Shopping'
    }
});

var Review = mongoose.model('Review', reviewSchema, 'reviews')

module.exports = Review
