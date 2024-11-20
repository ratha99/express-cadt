const express = require('express')
const {createCourse, getCourse, getCourseById, deleteCourse, updateCourse} = require("../controller/course.js")
const courserouter = express.Router();

courserouter.post('/', createCourse)
courserouter.get('/', getCourse)
courserouter.get('/:id', getCourseById)
courserouter.delete('/:id', deleteCourse)
courserouter.patch('/:id', updateCourse)

module.exports = courserouter