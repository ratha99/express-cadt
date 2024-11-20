const bookModel = require("../models/book.js")
const asyncHandler = require("express-async-handler")

const  getBooks = asyncHandler(async(req, res) => {
    // const book = await bookModel.find().populate("author")
    // return res.json(book)
    const {limit, page} = req.query
    const option  = {
        limit:limit ? limit: -1,
        page:page ? page : -1,
        pagination: limit ? true : false,
        populate: {
            path:"author",
            select: ["username","email"]
        },
    }
   // const {join} = req.query
    const book = await bookModel.paginate({

    }, option); 
    return res.json(book)
})
const getBookById = asyncHandler(async (req, res) => {
   const id = req.params.id;
        const book = await bookModel.findById(id)
        if(book){
            return res.json(book)
        }else{
            return res.json({
                "ms":"Id Not found!",
                "code":"500"
            })
        }

    
})
const createBook = asyncHandler(async(req,res) => {
    // const newBook = {
    //     id: req.body.id,
    //     title: req.body.title,
    //     description: req.body.description,
    //     pub_date: req.body.pub_date,
    //     auther: req.body.auther,
    //     isbn: req.body.isbn,
    //     link: req.body.link
    // }
    const book = new bookModel(req.body)
    const result = await book.save()
    return res.json(result)
})
const deleteBook = asyncHandler(async(req, res) => {

    const id = req.params.id;
    const result = await bookModel.findByIdAndDelete(id);
    return res.json(result)


})
const updateBook = asyncHandler(async(req, res) => {

    const id = req.params.id;
    const result = await bookModel.updateOne({...req.body,id})
    return res.json(result);

})

module.exports = {createBook, getBooks, deleteBook, updateBook, getBookById}