
var mongoose = require('mongoose')

var shoppingsiteSchema = mongoose.Schema ({

  nameofsite: String,
  establishedate: String,
  details: String,
  urlname: String,
  imagelink: String,
  reviewid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review'
  },

})

var Shopping = mongoose.model('Shopping', shoppingsiteSchema, 'shops')

module.exports = Shopping
