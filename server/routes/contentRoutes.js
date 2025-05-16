const Content = require('../models/Content');
const express = require('express');
const router = express.Router();
const contentControllers = require('../controllers/contentControllers');

router.route('/')
    .get(contentControllers.getAllProducts)
//     .post(contentControllers.createNewProduct);

// router.route('/info/:id')
//     .get(contentControllers.getProductById)
//     .put(contentControllers.updateProductInfo)

router.route('/addProduct')
    .post(contentControllers.createNewProduct)

module.exports = router;