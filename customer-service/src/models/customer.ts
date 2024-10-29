import mongoose, { Document, Schema } from 'mongoose';
import Counter from './counter';

export interface ICustomer extends Document {
    customerShortId: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    branchShortId: string;
}

const customerSchema: Schema = new Schema({
    customerShortId: { type: String, unique: true },
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true, unique: true },
    customerPhone: { type: String, required: true },
    branchShortId: { type: String, required: true }
});

customerSchema.pre<ICustomer>('save', async function (next) {
    if (!this.customerShortId) {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const shortName = "CUST";
        const counter = await Counter.findOneAndUpdate(
            { name: 'customerCounter' },
            { $inc: { value: 1 } },
            { new: true, upsert: true }
        );
        this.customerShortId = `${year}${shortName}${counter.value.toString().padStart(3, '0')}`;
        console.log('Generated Custom ID for Customer:', this.customerShortId);
    }
    next();
});

const Customer = mongoose.model<ICustomer>('Customer', customerSchema);
export default Customer;
