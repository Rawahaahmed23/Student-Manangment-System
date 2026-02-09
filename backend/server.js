require('dotenv').config()
const connectDb = require('./utils/db')
const express = require('express')

const app = express()
app.use(express.json());
const authRoutes = require('./routes/auth')


app.use('/',authRoutes)


const Port = 5000

connectDb().then(()=>{
    app.listen(Port,()=>{
      console.log(`server started at ${Port}`);
      
    })

})
