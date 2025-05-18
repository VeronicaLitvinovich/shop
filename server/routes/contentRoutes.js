const Content = require('../models/Content');
const express = require('express');
const router = express.Router();
const contentControllers = require('../controllers/contentControllers');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() }); // Хранение в памяти

router.route('/')
    .get(contentControllers.getAllProducts)

router.route('/addProduct')
    .post(upload.single('image'), contentControllers.createNewProduct);

router.route('/image/:id').get(contentControllers.getImage);

router.route('/:id')
    .delete(contentControllers.deleteProduct); 


module.exports = router;