const express = require('express')
const { createUser, getUsers, getUserById, deleteUserById, updateUserById, getUserByToken } = require('../controller/user.js')
const userRouter = express.Router()

// userRouter.post('/', createUser)
userRouter.get('/', getUsers)
userRouter.get('/:id', getUserById)
userRouter.delete('/:id', deleteUserById)
userRouter.put('/:id', updateUserById)
userRouter.get('/token/:token', getUserByToken)


module.exports = userRouter