const multer = require("multer");
const path = require("path");
const fs = require("fs");


const imagePath = path.join(__dirname,"../uploads/images");
const pdfPath = path.join(__dirname,"../uploads/pdfs");


// create folders automatically
if(!fs.existsSync(imagePath)){
  fs.mkdirSync(imagePath,{recursive:true});
}

if(!fs.existsSync(pdfPath)){
  fs.mkdirSync(pdfPath,{recursive:true});
}



const storage = multer.diskStorage({

  destination:function(req,file,cb){

    if(file.fieldname === "image"){
      cb(null,imagePath);
    }

    else if(file.fieldname === "pdf"){
      cb(null,pdfPath);
    }

  },


  filename:function(req,file,cb){

    cb(
      null,
      Date.now()+path.extname(file.originalname)
    );

  }

});


module.exports = multer({
  storage
});