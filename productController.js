// productController.js
import Product from '../Models/Product.js'; 
import readProductFile from '../utils/readProductFile.js'; 

export const addProductsFromFile = async (req, res) => {
    try {
        const productData = readProductFile();

        if (!productData) {
            return res.status(500).json({ error: 'Failed to read product data' });
        }

        for (const source in productData) {
            for (const category in productData[source]) {
                const products = productData[source][category];

                if (products.length === 0) continue; // Skip empty categories

                for (const product of products) {
                    // Data normalization (same as your provided logic)
                    const description = Array.isArray(product.description)
                        ? product.description.join(' ')
                        : product.description;

                    let price = 0;
                    if (typeof product.price === 'string') {
                        price = parseFloat(product.price.replace(/[^\d.-]/g, ''));
                    } else if (typeof product.price === 'number') {
                        price = product.price;
                    }

                    let rating = 0;
                    if (typeof product.rating === 'string') {
                        rating = product.rating.toLowerCase() === 'not rated' || isNaN(parseFloat(product.rating))
                            ? 0
                            : parseFloat(product.rating);
                    } else if (typeof product.rating === 'number') {
                        rating = product.rating;
                    }

                    const numReviews = parseInt(product.reviewsCount || product.ratingCount || '0');

                    // Create and save product
                    const newProduct = new Product({
                        source,
                        name: product.name,
                        image: product.imageUrl,
                        description,
                        category,
                        size: product.size || "N/A", // Default if size is missing
                        price,
                        rating,
                        numReviews,
                        url: product.url || "" // Default if URL is missing
                    });

                    await newProduct.save();
                }
            }
        }

        res.status(200).json({ message: 'Products added successfully!' });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: 'Sorry, something happened!' });
    }
};
