import mongoose from "mongoose";
const invoiceSchema = new mongoose.Schema(
  {
    idOrder: {
      type: String,
    },
    nameCustomer: {
      type: String,
    },
    addressCustomer: {
      type: String,
    },
    phoneCustomer: {
      type: String,
    },
    emailCustomer: {
      type: String,
    },
    nameTour: {
      type: String,
    },
    oldGuest: {
      type: Number,
    },
    childGuest: {
      type: Number,
    },
    total : {
        type: Number,
    }
  },
  { timestamps: true }
);
export default mongoose.model("invoice", invoiceSchema);
