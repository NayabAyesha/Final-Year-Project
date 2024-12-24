import Product from '../Models/Product.js'; 
import NewProduct from '../Models/NewProduct.js'
import mongoose from 'mongoose';

export const searchProducts = async (req, res) => {
  const searchQuery = req.query.search;
  console.log(req.query.search)
  try {
    if (!searchQuery) {
      return res.json([]);
    }

    // Find products whose name includes the search query (case-insensitive)
    const Products = await Product.find({
      name: { $regex: searchQuery, $options: 'i' }
    });

    res.json(Products);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Endpoint to search product by ID
export const searchProductById = async (req, res) => {
  const id = req.query.pid; // Fetch the ID from the query parameters
  console.log(id);

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid product ID' });
    }

    const product = await Product.findById(id); // Find the product by its ObjectId
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


// New endpoint to search NewProduct by name
export const searchNewProducts = async (req, res) => {
  const searchQuery = req.query.search;
  try {
    if (!searchQuery) {
      return res.json([]);
    }

    // Find new products whose name includes the search query (case-insensitive)
    const newProducts = await NewProduct.find({
      name: { $regex: searchQuery, $options: 'i' }
    });

    res.json(newProducts);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// New endpoint to search NewProduct by ID
export const searchNewProductById = async (req, res) => {
  const productId = req.params.id;
  try {
    const newProduct = await NewProduct.findById(productId);

    if (!newProduct) {
      return res.status(404).json({ error: 'NewProduct not found' });
    }

    res.json(newProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
