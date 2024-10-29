// src/models/Order.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IOrder extends Document {
  orderShortID: string;
  customerId: string;  // Reference to Customer ID
  branchShortId: string;
  productId: string;
  quantity: number;
  totalPrice: number;
  orderDate: Date;
  transactionStatus: 'Pending' | 'Completed' | 'Cancelled';
  fromDate: Date;
  toDate: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

const orderSchema = new Schema<IOrder>(
  {
    orderShortID: {
      type: String,
      required: true,
      unique: true,
    },
    customerId: {
      type: String,
      required: true,
    },
    branchShortId: {
      type: String,
      required: true,
    },
    productId: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    orderDate: {
      type: Date,
      required: true,
    },
    transactionStatus: {
      type: String,
      enum: ['Pending', 'Completed', 'Cancelled'],
      required: true,
    },
    fromDate: {
      type: Date,
    },
    toDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model<IOrder>('Order', orderSchema);
export default Order;
