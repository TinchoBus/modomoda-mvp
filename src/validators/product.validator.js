const { body } = require('express-validator');

const createProductValidator = [
  body('name')
    .notEmpty().withMessage('name es obligatorio')
    .isString().withMessage('name debe ser texto')
    .trim()
    .isLength({ min: 2 }).withMessage('name debe tener al menos 2 caracteres'),

  body('price')
    .notEmpty().withMessage('price es obligatorio')
    .isInt({ gt: 0 }).withMessage('price debe ser un entero mayor a 0'),

  body('stock')
    .optional()
    .isInt({ min: 0 }).withMessage('stock debe ser un entero mayor o igual a 0'),

  body('description')
    .optional()
    .isString().withMessage('description debe ser texto'),

  body('categoryId')
    .optional({ nullable: true })
    .isInt({ min: 1 }).withMessage('categoryId debe ser un entero válido'),
];

const updateProductValidator = [
  body('name')
    .optional()
    .notEmpty().withMessage('name no puede venir vacío')
    .isString().withMessage('name debe ser texto')
    .trim()
    .isLength({ min: 2 }).withMessage('name debe tener al menos 2 caracteres'),

  body('price')
    .optional()
    .isInt({ gt: 0 }).withMessage('price debe ser un entero mayor a 0'),

  body('stock')
    .optional()
    .isInt({ min: 0 }).withMessage('stock debe ser un entero mayor o igual a 0'),

  body('description')
    .optional()
    .isString().withMessage('description debe ser texto'),

  body('categoryId')
    .optional({ nullable: true })
    .isInt({ min: 1 }).withMessage('categoryId debe ser un entero válido'),
];

module.exports = { createProductValidator, updateProductValidator };
