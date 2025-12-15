const express = require('express');
const { createProduct, getAllProduct, updateProduct, getProductByCategory, getProductByid, deleteProduct, uploadimages } = require('../controllers/adminController');
const router = express.Router()

const multer = require('multer');
const { updateOrder, deleteOrder, updateOrderFild, getAllOrders } = require('../controllers/OrderController');
const { getCustomizeAllOrders, updateCustomizeOrder, deleteCustomizeOrder, updateCustomizeOrderState } = require('../controllers/customizeOrderController');
const { downloadSingleOrderExcel } = require('../controllers/orderExcel.controller');
const { downloadCustomOrderExcel } = require('../controllers/customOrderExcel.controller');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/createProduct' , uploadimages,createProduct)
router.get('/getAllProduct' , getAllProduct)
router.patch('/updateProduct/:id' , updateProduct)
router.get('/getProductByCategory/:category' , getProductByCategory)
router.get('/getProductByid/:id' , getProductByid)
router.get('/getProductByid/:id' , getProductByid)
router.get('/productDelete/:id', deleteProduct);

router.get('/getAllOrder', getAllOrders);
router.patch('/updateOrder/:id', updateOrder);
router.patch('/updateOrderFild/:id', updateOrderFild);
router.get('/deleteOrder/:id', deleteOrder);


router.get('/getAll/customizeOrder', getCustomizeAllOrders)
router.patch('/update/customizeOrder/:id', updateCustomizeOrder)
router.patch('/update/customizeOrderState/:id', updateCustomizeOrderState)
router.get('/delete/customizeOrder/:id', deleteCustomizeOrder)

router.get('/download/excel/:id', downloadSingleOrderExcel)
router.get('/download/customOrder/excel/:id', downloadCustomOrderExcel)

module.exports = router ;