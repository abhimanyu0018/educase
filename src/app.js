import express, { json } from "express"
import cors from "cors"

const app = express()


app.use(cors(
    {
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true,
        allowedHeaders: "Content-Type,Authorization",
    }
))




// app.use(cookieParser());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));


// routes --
app.get('/', (req,res) => {
    try {
        console.log("working");

    res.json({msg: "working!!"})
    } catch (error) {
        console.log(error);
        
       return res.status(500).json({err: error})
    }
    
})


import schoolRouter from "./routes/school.route.js";

app.use('/api', schoolRouter)

export default app