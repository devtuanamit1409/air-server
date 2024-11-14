import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import authRoute from './routes/authRoute.mjs'
import userRoute from './routes/userRoute.mjs'
import categoryRoute from './routes/categoryRoute.mjs'
import tourRoute from './routes/tourRoute.mjs'
import orderRoute from './routes/orderRoute.mjs'
import pointstartRoute from './routes/pointstart.mjs'
import pointendRoute from './routes/pointend.mjs'
import VNpayRoute from './routes/VNPayRoute.mjs'
import invoiceRoute from './routes/invoiceRoute.mjs'
const app = express();
const port = 8888;
dotenv.config()
app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = mongoose.connection;
  db.on("error", (error) => {
    console.error("MongoDB connection error:", error);
  });
  
  db.once("open", () => {
    console.log("MongoDB connected successfully!");
  });

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
app.use('/api/auth' , authRoute)  
app.use('/api/user' , userRoute)
app.use('/api/category' , categoryRoute)
app.use('/api/tour' , tourRoute)
app.use('/api/order' , orderRoute)
app.use('/api/pointstart', pointstartRoute )
app.use('/api/pointend', pointendRoute )
app.use('/api/vnpay' , VNpayRoute)
app.use('/api/invoice' , invoiceRoute)