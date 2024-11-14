import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    customerInfo : {
        type : Object
    },
    payment_method : {
        type : Object
    },
    idUser : {
        type : String,
    },
    status : {
        type : Boolean,
        default : false
    },
    cart : {
        type : Object
    }
},
{ timestamps: true }
);

export default mongoose.model('Order', OrderSchema);
