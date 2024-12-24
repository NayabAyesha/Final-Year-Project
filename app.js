import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import { registerUser , loginUser } from "./controllers/users.js";
import productRoutes from './routes/productRoutes.js';
import { searchProducts,searchNewProducts, searchProductById}  from './controllers/search.js';
import { addProduct }  from './controllers/AddNewProduct.js';


dotenv.config(); 


const app = express();
app.use(express.json());
app.use(cors()); // Enable CORS

// Database connection (replace with your actual credentials)
mongoose.connect("mongodb+srv://bestbuyfinder101:hello@cluster0.nvrviwz.mongodb.net/Ecommerce?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected!!');
}).catch(err => {
    console.log('Failed to connect to MongoDB', err);
});

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Use the product routes
app.use('/api/products', productRoutes); 

app.use("/api/register" , registerUser);
app.use("/api/login" , loginUser);
app.use("/api/searchproduct",searchProducts);
app.use("/api/addProduct",addProduct);
app.use("/api/searchProductById",searchProductById);
app.use("/api/searchNewProducts",searchNewProducts);



// Error handling middleware (add this after your routes)
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error for debugging
  res.status(500).json({ error: 'Something went wrong!' }); // Generic error message to the client
});

const PORT = process.env.PORT || 3001; 
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
