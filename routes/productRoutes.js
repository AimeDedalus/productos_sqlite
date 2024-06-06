const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.getIndex);
router.get('/add', productController.getAddProduct);
router.post('/add', productController.postAddProduct);
router.get('/search', productController.getSearchProduct);
router.post('/search', productController.postSearchProduct);
router.get('/modifySearch', productController.getModifySearch);
router.post('/modifySearch', productController.postModifySearch);
router.post('/modify', productController.postModifyProduct);
router.get('/delete', productController.getDeleteProduct);
router.post('/delete', productController.postDeleteProduct);
router.post('/deleteConfirm', productController.postDeleteConfirm);
router.get('/showAll', productController.getShowAllProducts);

module.exports = router;
