//Json Data insertion in MongoDB 
require("dotenv").config()
const connectDB = require('./db/connect')
const Student = require('./model/student')

const StudentJson = require('./students.json')
//json is pushed to the by pushing it from the model to the database
const start = async () => {
    await connectDB(process.env.MONGOURI);
    //    await Student.collection.drop();//using drop you can update your drop the duplicacies
    await Student.deleteMany(); // will delete the duplicates of the data in the mongodb like 1 of 7 becomes 1 of 14  this wont happen
    await Student.create(StudentJson);

    console.log("Successfull")
}
start();

// now run only one time node studentDB.js to push it to the mongodb

//then again start the server