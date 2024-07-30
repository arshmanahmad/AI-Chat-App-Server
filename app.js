import express from 'express';
import cors from 'cors';
import connectDb from './config/ConnectDb.js';
import authRoutes from './routes/auth.routes.js';

const app = express();
app.use(express.json());
app.use(cors());

connectDb()

app.get("/", (req, res) => {
    res.send("welcome to the API");
})

app.use('/api/auth', authRoutes)

app.listen(5000, () => {
    console.log("Server started at 5000");
})