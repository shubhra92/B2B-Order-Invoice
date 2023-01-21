const express = require('express');
const { mongoose } = require('mongoose');
const route = require('./route/route');

const app = express();

//appling cors police
app.use(require('cors')())

//db connection
const url="mongodb+srv://Shubhra:r18eoEUZGM7BL4xD@s1.pihhixc.mongodb.net/kwikpicDB"
mongoose.set('strictQuery', true)
mongoose.connect(url).then(()=> console.log("mongoDB is connected ✅") ).catch( (error)=> console.log(error.message) )

//body data parse into json
app.use(express.json())

app.use(route)


//server listener
const port = process.env.PORT || 3001
app.listen(port, () => console.log(`server running on port ${port} 🌐`) )