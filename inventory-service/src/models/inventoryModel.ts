import mongoose, { Document, Schema } from 'mongoose';
import Counter from './counter';

interface IInventory extends Document {
<<<<<<< HEAD
  //productId: string;
  //branchId: string;
  inventoryId: string;  // Automatically generated
  brandName: string;
  branchShortId: string;  // Required field for branch short ID
  //stockLevel: number;
  //reorderThreshold: number;
=======
  inventoryId: string;  // Automatically generated
  brandName: string;
  branchShortId: string;  // Required field for branch short ID
>>>>>>> dbab1617037094653828be4d432305f676a4bfec
  lastUpdated?: Date;
}

const inventorySchema = new Schema<IInventory>({
<<<<<<< HEAD
  //productId: { type: String, required: true },
  //branchId: { type: String, required: true },
=======
>>>>>>> dbab1617037094653828be4d432305f676a4bfec
  brandName: { type: String, required: true },
  branchShortId: { type: String, required: true },
  lastUpdated: { type: Date, default: Date.now },
  inventoryId: { type: String, unique: true }
});

// Auto-generate `inventoryId` before saving
inventorySchema.pre<IInventory>('save', async function (next) {
  if (!this.inventoryId) {
    const counter = await Counter.findOneAndUpdate(
      { name: 'inventoryCounter' },
      { $inc: { value: 1 } },
      { new: true, upsert: true }
    );
    this.inventoryId = `INV${counter.value.toString().padStart(5, '0')}`;
  }
  next();
});

const Inventory = mongoose.model<IInventory>('Inventory', inventorySchema);
export default Inventory;
