const express = require('express');
const { createOrder } = require('../controllers/OrderController');
const { CustomizeOrderCreate } = require('../controllers/customizeOrderController');
const router = express.Router()

// router.get('/getAllProduct')
// router.get('/getProductByCategory')
router.post('/createOrder', createOrder)
router.post('/create/CustomizeOrder', CustomizeOrderCreate)

module.exports = router ;