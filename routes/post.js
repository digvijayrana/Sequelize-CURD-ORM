const express = require('express')
const postController = require('../controller/postController')
const uploadImage = require('../helpers/imageUpload')
const router = express.Router();


router.post('/insert',uploadImage.upload.single('image'),postController.save)
router.get('/getDetails',postController.show);
router.get('/getInbox',postController.index);
router.patch('/updateData',postController.update);
router.delete('/Delete',postController.destory)
module.exports = router