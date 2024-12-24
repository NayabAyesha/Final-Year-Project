import fs from 'fs/promises'; 
import { v4 as uuidv4 } from 'uuid';
import Newproduct from '../Models/NewProduct.js';
import cloudinary from '../utils/cloudinary.js';

export const addProduct = async (req, res) => {
  try {
    const productPhotos = [];

    // Check if files exist and are of allowed types (replace with your allowed types)
    if (req.files && req.files.productPhotos) {
      const files = Array.isArray(req.files.productPhotos) ? req.files.productPhotos : [req.files.productPhotos];

      for (const file of files) {

        const tempFilePath = `/tmp/${uuidv4()}-${file.name}`;

        // Save the file temporarily
        await fs.writeFile(tempFilePath, file.data);

        // Upload the file to Cloudinary
        const result = await cloudinary.uploader.upload(tempFilePath, {
          folder: "images", // Optional: specify a folder in Cloudinary
        });

        productPhotos.push(result.secure_url);

        // Clean up temporary files
        await fs.unlink(tempFilePath);
      }
    }

    const newProduct = new Newproduct({
      user_id: '1',  // Assuming user_id is coming from the request body
      name: req.body.productName,
      price: req.body.productPrice,
      description: req.body.productDescription,
      location: req.body.productLocation,
      phoneNumber: req.body.phoneNumber,
      productPhotos: productPhotos, 
      source: 'Best Buy Finder' // Adjust as needed based on where source comes from
    });
    

    await newProduct.save();
    res.status(201).json({ success: true, message: "Product added successfully" });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ success: false, error: error.message });
  }
};