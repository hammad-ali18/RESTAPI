const { Schema, default: mongoose } = require('mongoose');


const studentSchema = new Schema({
    _studentId: {
        type: Number,
        required: [true, 'Field is required'],
    },

    studentName: {
        type: String,
        required: [true, "Field is required"]
    },

    studentAge: {
        type: Number,
        required: [true, "Field is required"]
    },

    studentSubject: {
        type: String,
        enum: {
            values: ['DSA', 'OOP', 'COAL', "HRM"]
        },
        required: [true, "Field is required"]
    }


})

module.exports = mongoose.model("Student", studentSchema)