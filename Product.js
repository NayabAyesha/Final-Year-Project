// Product.js
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    source: {
        type: String,
    },
    name: {
        type: String,
    },
    image: {
        type: String,
    },
    description: {
        type: String,
    },
    category: {
        type: String,
    },
    size: {
        type: String
    },
    price: {
        type: Number,
    },
    rating: {
        type: Number,
        default: 0
    },
    numReviews: {
        type: Number,
        default: 0
    },
    url: {
      type: String
  }
});

export default mongoose.models.Product || mongoose.model('Product', productSchema);
