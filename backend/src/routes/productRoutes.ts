import express, { Router } from 'express'
import { verifyToken } from "../middlewares/verifyToken";
import { createProduct, createProductReview, deleteProduct, getProductById, updateProduct } from '../controllers/productsController.js';

const product_router = Router()

product_router.post('/', createProduct)
product_router.post('/:id/reviews', createProductReview)
product_router.get('/:id',getProductById)
product_router.delete("/:id",verifyToken,deleteProduct)
product_router.put("/:id",verifyToken,updateProduct)

export default product_router;