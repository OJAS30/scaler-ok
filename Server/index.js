const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const cors=require('cors');
const dotenv=require('dotenv');
const student=require('./Routes/routes');

const app=express();
app.use(cors());
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());
dotenv.config();
const dbString=process.env.DATABASE_URL;

mongoose.connect(dbString,{useNewUrlParser: true,
    useUnifiedTopology: true,}).then(()=>{
    console.log('Connected to MongoDb');
}).catch((err)=>{
        console.error('Error connecting to MongoDb', err)
});

app.use("/student", student);

const PORT= process.env.Port || 5000;
app.listen(PORT, ()=>{
    console.log(`Server listening on Port :${PORT}`);
});