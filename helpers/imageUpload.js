const multer = require('multer');
const path = require('path');
const express = require('express')
const router = express()
const fs = require('fs')



// Check File Type
function checkFileType(file, cb){
    // Allowed ext
    const filetypes = /jpeg|jpg|png|pdf|tiff|/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);
    
    if(mimetype && extname){
    return cb(null,true);
    } else {
    cb('Error: Images and Pdf Only!');
    }
   }
  var storage = multer.diskStorage({
      destination: function (req, file, cb) {
     
        fs.mkdir(path.join(__dirname, '../public/uploads/'), (err) => {
            if (err) {
                if(err.code == 'EEXIST'){
                    cb(null, "public/uploads/");
                }else{
                    return console.error(err);
                }
            }else{
                cb(null, "public/uploads/");
            }
        });
      },
      filename: function (req, file, cb) {
          var a= file.fieldname + "-" + Date.now() + path.extname(file.originalname)
          req.fileName=a
        cb(null, a);
      },
    });
    
    var upload = multer({ storage: storage,
      limits:{fileSize: 3000000},
      fileFilter: function(req, file, cb){
      checkFileType(file, cb) }});
  

// function wrappedFileFilter (req, file, cb) { 
//     if ((filesLeft[file.fieldname] || 0) <= 0) { 
//       return cb(new MulterError('LIMIT_UNEXPECTED_FILE', file.fieldname)) 
//     } 
   
//     filesLeft[file.fieldname] -= 1 
//     fileFilter(req, file, cb) 
//   }
module.exports = {
    upload:upload
}
