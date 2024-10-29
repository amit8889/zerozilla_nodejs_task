const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const apiRoutes = require('./routes/route');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use('/api', apiRoutes);
app.get("/test",(req,res)=>{
    try {
        res.status(200).json({
            success:true,
            message:"Runing..."
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
});
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
