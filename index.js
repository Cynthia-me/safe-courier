import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import parcelRoutes from './Routes/parcels.js';
import userRoutes from './Routes/users.js'

const app = express();

dotenv.config();

const port = process.env.PORT || 3500

app.use(bodyParser.json());

app.get('/',(req,res)=>{
    res.send("WELCOME TO SAFE COURIER");
});

app.use('/api/v1/parcels',parcelRoutes);
app.use('/api/v1/users',userRoutes);

app.listen(port,function(req,res){
    console.log(`Server is running on port ${port}`);
});







































































































