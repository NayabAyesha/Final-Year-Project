// productRoutes.js
import express from 'express';
const router = express.Router();
import { addProductsFromFile } from '../controllers/productController.js'; 

// Route to add products from file
router.get('/addProductsFromFile', addProductsFromFile);

export default router; // Export the router as the default export
