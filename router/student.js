const express = require('express')
const router = express.Router()

const {
    getStudents,
    getStudentsTesting

} = require('../controller/student')


router.route("/").get(getStudents);
router.route("/testing").get(getStudentsTesting);

module.exports = router;
