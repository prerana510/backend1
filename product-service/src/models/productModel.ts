import mongoose, { Document, Schema } from 'mongoose';
import Counter from './Counter';   // Assuming a Counter model exists for managing counters

interface IProduct extends Document {
  productShortId: string;
  productName: string;
  productQuantity: number;
  description: string;
  category: string;
  price: number;
  productImage: string;
  inventoryShortId: string;  // Reference to inventory short ID
  branchShortId: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

const productSchema = new Schema<IProduct>(
  {
    productName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    productQuantity: {
      type: Number,
      default: 0,
    },
    inventoryShortId: {
      type: String,
      required: true,
    },
    productImage: {
      type: String,
      default: '',  // Default can be an empty string or a placeholder URL
    },
    productShortId: {
      type: String,
      unique: true,
    },
    branchShortId: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

// Pre-save middleware to generate productShortId using a counter
productSchema.pre<IProduct>('save', async function (next) {
  try {
    const counter = await Counter.findOneAndUpdate(
      { name: 'productCounter' },
      { $inc: { value: 1 } },
      { new: true, upsert: true }
    );

    this.productShortId = `PROD-${counter.value.toString().padStart(4, '0')}`;
    next();
  } catch (error: any) {
    next(error);
  }
});

const Product = mongoose.model<IProduct>('Product', productSchema);
export default Product;
