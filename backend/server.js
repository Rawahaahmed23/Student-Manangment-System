require('dotenv').config()
const connectDb = require('./utils/db')
const express = require('express')
const cors = require('cors')
const cookieParser = require("cookie-parser");
const app = express()
const authRoutes = require('./routes/auth')
const errormiddleware = require('./middleware/errormiddleware')
const StudentRoutes = require('./routes/StudentRoutes')
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true 
   
}));


app.use(express.json());
app.use(cookieParser());
app.use('/',authRoutes)
app.use('/Student',StudentRoutes)
app.use(errormiddleware)

const Port = 5000

connectDb().then(()=>{
    app.listen(Port,()=>{
      console.log(`server started at ${Port}`);
      
    })

})
