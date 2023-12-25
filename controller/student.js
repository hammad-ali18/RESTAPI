//make two functions one is a valid and another is for test
const student = require('../model/student');
const Student = require('../model/student') //the data is always in the model model holds everything



const getStudents = async (request, response) => {
    console.log("request", request.query)

    //1)ADDING FILTERATION
    //if a user enters the api required with & and one condition is Wrong then like below
    // localhost:5000/api/students?studentSubject=DSA&srasdk=asd
    const { studentAge, studentSubject, studentName, sort } = request.query;

    const queryObject = {};
    //remove the case sensitiveness use the regex for lower and uppercase characters

    if (studentName) {
        queryObject.studentName = { $regex: studentName, $options: "i" } //i represents case insensitive
    }
    if (studentAge) {
        queryObject.studentAge = studentAge
    }

    if (studentSubject) {

        queryObject.studentSubject = { $regex: studentSubject, $options: "i" };
    }

    // console.log(queryObject); //by this url localhost:5000/api/students?studentSubject=DSA&studentAge=21&studentName=Sharjeel Khan

    //1.2)ADDING ADVANCE FILTER
    //and if you want to filter out two attribute at a time 


    // 2)Adding Sorting functionality like asc to desc
    //sorting in asc order default for desc use -field

    //"When a user request sort"

    let ApiData = Student.find(queryObject)
    //THE MULITPLE SORT IS NOT WORKING BY ME ,WILL BE APPLICABLE ON SINGLE FIELD
    if (sort) {//if user sorts  localhost:5000/api/students?sort=studentName or -studentName
        let sortFix = sort.split(",").join(" ")
        console.log("Sort fix", sortFix)
        ApiData = ApiData.sort(sortFix)
        // const sortFields = sort.split(',').map(field => field.trim());Z
        // console.log("Sort fields", sortFields);
        // ApiData = ApiData.sort(sortFields);

    }
    //Pagination
    let page = Number(request.query.page) || 1;  //the user request the total number of page
    let limit = Number(request.query.limit) || 3; // the user reqeust that each page contain HERE THE LIMIT IS 3 SET
   
 //make the skip formula
 let skip = (page - 1) * limit
 ApiData = ApiData.skip(skip).limit(limit)

    // console.log("pageObject", pageObject)
    console.log("queryObject: ",queryObject)
    const myStudent = await ApiData  //Student.find(queryObject)   //can use the .skip(2) which will skip the 2 data
    response.status(200).json({
        myStudent,
        nBHits: myStudent.length
    })

}

//Student.find({}) will hit the url directly in filtering but we cannot get the data manually filtered by typing 
// ?studentAge=22 ,for this we will use the req.query
// req is for hitting the server as we sending the data on the server with the condition

// req.body is used in POST/PUT request Use it when you want to send sensitive data(eg. form data) or super long JSON data to the server.

//req.params These are properties attached to the url i.e named route parameters. You prefix the parameter name with a colon(:) when writing your routes.

//req.query req.query is mostly used for ``searching,sorting, filtering, pagination``, e.t.c
// Say for instance you want to query an API but only want to get data from page 10,

//The test is the simple API

const getStudentsTesting = async (request, response) => {

    const { studentName, studentAge, studentSubject, select } = request.query
    const queryObject = {}

    if (studentName) {
        queryObject.studentName = { $regex: studentName, $options: 'i' }
    }

    if (studentAge) {
        queryObject.studentAge = studentAge;
    }
    if (studentSubject) {
        queryObject.studentSubject = { $regex: studentSubject, $options: 'i' }
    }
    let ApiData = Student.find(queryObject)
    if (select) {
        //    let selectReplace = select.replace(","," ");
        let selectReplace = select.split(",").join(" ") //if we want more then 2 fields to be selected
        console.log("Select Replace: ", selectReplace)
        ApiData = ApiData.select(selectReplace)
    }



    const data = await ApiData
    // Student.find(
    //   queryObject//req.query is best for us  we dont need to hardcode the condition because when the user hits the request for the data ther server automatically return the response status from below code
    // )
    // user can query the server like this localhost:5000/api/students/testing?studentAge=24&studentSubject=COAL
    response.status(200).json({
        // "Status" :"Running Student Testing"
        nBHits: data.length,
        data,
    })

    console.log(queryObject)
}



module.exports = { getStudents, getStudentsTesting }


