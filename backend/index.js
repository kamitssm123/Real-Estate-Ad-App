import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import connectDB from './config/db.js';
import testRoutes from './routes/testRoutes.js'
import authRoutes from './routes/authRoutes.js'
import runPromt from './utils/openAI/index.js';
import getNearbyPlaces from './utils/googleMap/index.js';

dotenv.config();

connectDB();

const app = express();

// middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// PORT
const PORT = process.env.PORT || 8080;

// routes
app.use("/api/v1/test", testRoutes);
app.use("/api/v1/auth", authRoutes);

app.listen(PORT, () => {
    console.log(`Node Server Running on PORT ${PORT}`);
})

// runPromt();
getNearbyPlaces("40.7128,-74.0060");


