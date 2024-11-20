
const asyncHandler = require("express-async-handler");
const courseModel = require("../models/course");
const redisClient = require('../redis/index.js')
async function getCourse(req, res){
    // const courses = await courseModel.find()
    // return res.json(courses)
    const {limit, page} = req.query
    const option  = {
        limit:limit ? limit: -1,
        page:page ? page : -1,
        pagination: limit ? true : false
    }
    const courses = await courseModel.paginate({
        price:{
            $gte:100.00,
            $lte:200.00
        }
    }, option); 
    return res.json(courses)

    // const book = await courseModel.find()
    // return res.json(book)
    // const key = '/courses'
    // const result = await redisClient.get(key)
    // // console.log(result)
    // if (!result) {
    //     // Query operation takes time
    //     console.log("Consuming Time")
    //     const courses = await courseModel.find()
    //     redisClient.set(key, JSON.stringify(courses), {
    //         EX: 30
    //     })
    //     return res.json(courses)
    // }
    // const course = JSON.parse(result)
    // // console.log(result)
    // return res.json(course)
}
const getCourseById = asyncHandler(async (req, res) => {
   const id = req.params.id;
        const book = await courseModel.findById(id)
        if(book){
            return res.json(book)
        }else{
            return res.json({
                "ms":"Id Not found!",
                "code":"500"
            })
        }

    
})
const createCourse = asyncHandler(async(req,res) => {
    // const newBook = {
    //     id: req.body.id,
    //     title: req.body.title,
    //     description: req.body.description,
    //     pub_date: req.body.pub_date,
    //     auther: req.body.auther,
    //     isbn: req.body.isbn,
    //     link: req.body.link
    // }
    const book = new courseModel(req.body)
    const result = await book.save()
    return res.json(result)
})
const deleteCourse = asyncHandler(async(req, res) => {

    const id = req.params.id;
    const result = await courseModel.findByIdAndDelete(id);
    return res.json(result)


})
const updateCourse = asyncHandler(async(req, res) => {

    const id = req.params.id;
    const result = await courseModel.updateOne({...req.body,id})
    return res.json(result);

})

module.exports = {createCourse, getCourse, deleteCourse, getCourseById, updateCourse}