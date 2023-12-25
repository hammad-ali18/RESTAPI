require("dotenv").config();
const express = require("express");
const app = express();
const cors = require('cors');


const port = 5000




//test this on postman
// app.get('/', async (req, res) => {

//     const status = {
//         'Status': ' Server Running'
//     }
//     res.send(status)

// })

//make the controller and then the router
// app.use(cors())
//now define the middlewear

const student_Routes = require('./router/student')

app.use('/api/students', student_Routes)

//as the server is being responding correctly through it's response

//now make the connection on the Database
const connectDB = require("./db/connect")
const start = async () => {
try {
    app.listen(port, () => {
        console.log(`🚀 The App is running on port ${port}`)
    })

    await connectDB(process.env.MONGOURI)
    
} catch (error) {
    console.error(error)
}

}
start();

//now make the schema and pass it to the model

//after creating the Schema just go ahmed create .json file of students.json and also the studentDB.js
//these two are the separate things that listens the schema and push the json to your mongoDB

//now the json is pushed so you have to diplay it on the

//then you can apply the req.query for filteration Sorting(searching)

//using SELECT in mongoose using .select('studentName studentAge')

// now how can I add pagination to our REST API

//HOST the REST/RESTFUL API LIVE  Use the Railway App


