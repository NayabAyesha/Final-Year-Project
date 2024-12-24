import mongoose from "mongoose";

const { Schema } = mongoose;

const AddProductSchema = new Schema({
  user_id: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  productPhotos: [{ type: String }],
  source: {  type: String},
});

const NewProduct = mongoose.models.NewProduct || mongoose.model('NewProduct', AddProductSchema);

export default NewProduct;
