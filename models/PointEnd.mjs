import mongoose from "mongoose";
const PointEndSchema = new mongoose.Schema({
    name : {
        type : String,
        required: true,
        unique: true,
    },
    img : {
        type : String,
    },
    des : {
        type : String,
    }
})
export default mongoose.model('PointEnd', PointEndSchema);