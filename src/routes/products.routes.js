const express = require('express');
const router = express.Router();
const controller = require('../controllers/products.controller');

const validateFields = require('../middlewares/validateFields');
const {
  createProductValidator,
  updateProductValidator
} = require('../validators/product.validator');

router.get('/', controller.getAllProducts);

router.post(
  '/',
  createProductValidator,
  validateFields,
  controller.createProduct
);

router.put(
  '/:id',
  updateProductValidator,
  validateFields,
  controller.updateProduct
);

// opcional: router.get('/:id', controller.getProductById);
// opcional: router.delete('/:id', controller.deleteProduct);

module.exports = router;




// const express = require('express');
// const router = express.Router();
// const controller = require('../controllers/products.controller');

// router.get('/', controller.getAllProducts);
// router.get('/:id', controller.getProductById);
// router.post('/', controller.createProduct);
// router.put('/:id', controller.updateProduct);
// router.delete('/:id', controller.deleteProduct);

// module.exports = router;
