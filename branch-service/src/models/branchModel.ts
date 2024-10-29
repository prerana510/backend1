import mongoose, { Document, Schema } from 'mongoose';
import Counter from './counter';

interface IBranch extends Document {
  branchLocation: string;
  branchRegion: string;
  branchMobileNumber:number,
  branchEmail:string,
  branchShortId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const branchSchema = new Schema<IBranch>(
  {
    branchLocation: {
      type: String,
      required: true,
    },
    branchRegion: {
      type: String,
      required: true,
    },
    branchMobileNumber:{
        type: Number,
        required: true,
    },
    branchEmail: {
        type: String,
        required: true,
        unique: true,
    },
    branchShortId: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);

branchSchema.pre<IBranch>('save', async function (next) {
  try {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const shortName = "unq";

    const counter = await Counter.findOneAndUpdate(
      { name: 'branchCounter' },
      { $inc: { value: 1 } },
      { new: true, upsert: true }
    );

    this.branchShortId = `${year}${shortName}${counter.value.toString().padStart(4, '0')}`;
    console.log('Generated Custom ID for Branch:', this.branchShortId);

    next();
  } catch (error:any) {
    next(error);
  }
});

const Branch = mongoose.model<IBranch>('Branch', branchSchema);
export default Branch;
