import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import router from "./routes/index.js";


const app = express();

dotenv.config({path: './config/.env'})

//parse json response
app.use(express.json())
//parse form request
app.use(express.urlencoded({extended: false}))

// db connection
connectDB()


app.use(
  cors({
    origin: "https://todo-app-mwb1.onrender.com",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  })
);

app.use('/', router)


const PORT = process.env.PORT || 5050;

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
