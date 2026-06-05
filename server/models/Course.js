<<<<<<< HEAD
const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: String,
    shortDescription:{
        type: String,
    },
    longDescription:{
        type:String
    },
    instructorName:String,
    price: Number,

    image:{
        type:String
    },
    category: {
        type:String,
        required:true
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },


reviews: [

  {

    user: {

      type:
        mongoose.Schema.Types.ObjectId,

      ref: "User"

    },

    userName: {

      type: String

    },

    rating: {

      type: Number

    },

    comment: {

      type: String

    }

  }

]
});
=======
const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: String,
    shortDescription:{
        type: String,
    },
    longDescription:{
        type:String
    },
    instructorName:String,
    price: Number,

    image:{
        type:String
    },
    category: {
        type:String,
        required:true
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },


reviews: [

  {

    user: {

      type:
        mongoose.Schema.Types.ObjectId,

      ref: "User"

    },

    userName: {

      type: String

    },

    rating: {

      type: Number

    },

    comment: {

      type: String

    }

  }

]
});
>>>>>>> 5d06d87ca6f485ce0a7c362e03ccc8f12feb42c4
module.exports = mongoose.model("Course", courseSchema);