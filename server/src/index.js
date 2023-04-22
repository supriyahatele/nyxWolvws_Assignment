const express = require('express');
const mongoose = require('mongoose');
const route = require('./routes/route');

const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/v1', route);
mongoose.set('strictQuery', false);
mongoose.connect("mongodb+srv://cluster0.6evf0.mongodb.net/?retryWrites=true&w=majority", {
        dBname: 'EmployeeRecord',
        user: 'Supriya09',
        pass: 'Supriya@1998',
        useNewUrlParser: true
    })
.then(() => console.log("MongoDb is connect....✔✔"))
.catch(err => console.log(err));



const port = process.env.PORT || 4000;

const server = app.listen(port, ()=>{
    console.log(`Server is running on Port: ${port}`);
});
io=require("socket.io")(server,{
    cors:{
        origin:"http://localhost:3000",
    }
});

io.on("connection",(socket)=>{
    console.log(" user connected",socket.id)
    socket.on("disconnect",()=>{
        console.log("user disconnected",socket.id)
    })

})




