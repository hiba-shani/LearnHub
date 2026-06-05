
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

module.exports = mongoose.model("Course", courseSchema);