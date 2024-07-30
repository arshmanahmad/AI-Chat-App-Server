import express from 'express';
import cors from 'cors';


const app = express();
app.use(express.json());
app.use(cors());


app.get("/", (req, res) => {
    res.send("welcome to the API");
})

app.listen(5000, () => {
    console.log("server started at 4000");
})