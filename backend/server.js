require('dotenv').config()
const connectDb = require('./utils/db')
const express = require('express')

const app = express()
app.use(express.json());
const authRoutes = require('./routes/auth')
const errormiddleware = require('./middleware/errormiddleware')
const StudentRoutes = require('./routes/StudentRoutes')


app.use('/',authRoutes)
app.use('/Student',StudentRoutes)
app.use(errormiddleware)


const Port = 5000

connectDb().then(()=>{
    app.listen(Port,()=>{
      console.log(`server started at ${Port}`);
      
    })

})
