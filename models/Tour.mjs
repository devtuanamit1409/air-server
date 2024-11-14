import mongoose from "mongoose";
const TourSchema = new mongoose.Schema(
    { 
        name : {
            type : String,
            
        },
        time : {
            type : String,
        },
        dateStart : {
            type : String
        },
        locationStart : {
            type: String,
            ref: 'PointStart',
            
        },
        plant : {
            type : String
        },
        maxGuest : {
            type : Number
        },
        oldGuest : {
            type : Number
        },
        childGuest : {
            type : Number
        },
        locationEnd : {
            type: String,
            ref: 'PointEnd',
            
        },
        des : {
            type : String,
            
        },
        childrenPrice : {
            type : Number,
            
        },
        oldPrice : {
            type : Number,
            
        },
        detail : {
            type : String ,
            
        },
        imgDetail : [
            {
                type: String,
            }
        ],
        detailLocation : [
            {
                type: String,
            }
        ],
        listCustomer : [
            {
                type: String,
            }
        ],
        category: {
            type: String,
            ref: 'Category', // Tham chiếu đến mô hình danh mục
            required : true
        },
        idGuide : {
            type: String,
            ref: 'User', // Tham chiếu đến mô hình danh mục
        },
        status : {
            type : String ,
            enum: ['pending', 'start', 'middle', 'completed', 'cancelled'],
            default : "pending",
            required : true
        }
    },
{ timestamps: true }
)
export default mongoose.model('Tour', TourSchema);