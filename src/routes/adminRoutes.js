const express = require('express');
const { createProduct, getAllProduct, updateProduct, getProductByCategory, getProductByid, deleteProduct, updateProductImage } = require('../controllers/adminController');
const router = express.Router()

const multer = require('multer');
const { updateOrder, deleteOrder, updateOrderFild, getAllOrders } = require('../controllers/OrderController');
const { getCustomizeAllOrders, updateCustomizeOrder, deleteCustomizeOrder, updateCustomizeOrderState } = require('../controllers/customizeOrderController');
const { downloadSingleOrderExcel } = require('../controllers/orderExcel.controller');
const { downloadCustomOrderExcel } = require('../controllers/customOrderExcel.controller');

// const upload = require('../configer/upload')
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/createProduct' ,  upload.fields([{ name: "product_image", maxCount: 1 }]) ,createProduct)
router.get('/getAllProduct' , getAllProduct)
router.patch('/updateProduct/:id' , upload.fields([{ name: "product_image", maxCount: 1 }]), updateProduct)
router.get('/getProductByCategory/:category' , getProductByCategory)
router.get('/getProductByid/:id' , getProductByid)
router.get('/productDelete/:id', deleteProduct);
router.patch(
  "/updateProductImage/:id/image",
  upload.single("product_image"),
  updateProductImage
);

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