const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({

  destination: function(req,file,cb){

    if(file.fieldname === "image"){
      cb(null,"uploads/images");
    }

    else if(file.fieldname === "pdf"){
      cb(null,"uploads/pdfs");
    }

  },


  filename:function(req,file,cb){

    cb(
      null,
      Date.now() + path.extname(file.originalname)
    );

  }

});


module.exports = multer({
  storage
});