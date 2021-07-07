const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'../public/uploads');
       

    },
    filename:function(req,file,cb){
            cb(null,new Date().getTime()+path.extname(file.originalname));
    }
});

const fileFilter = (req,file,cb)=>{
    if(file.mimetype ==='image/jpeg' || file.mimetype ==='image/png' || file.mimetype === 'image/pdf'){
        cb(null,true)
    }else{
        cb(new Error('Unsupported file'),false);
    }
}

const upload = multer({
    storage:storage,
    limits:{
        fileSize:1024*1024*10
    },
    fileFilter:fileFilter
});

function wrappedFileFilter (req, file, cb) { 
    if ((filesLeft[file.fieldname] || 0) <= 0) { 
      return cb(new MulterError('LIMIT_UNEXPECTED_FILE', file.fieldname)) 
    } 
   
    filesLeft[file.fieldname] -= 1 
    fileFilter(req, file, cb) 
  }
module.exports = {
    upload:upload
}
