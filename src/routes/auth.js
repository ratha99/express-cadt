const express = require('express');
const { signUp,login, logout,showGoogleOAuth, handleGoogle, exchangeJWTToUser, exchangeRefreshToken} = require('../controller/auth');
const authRouter = express.Router();
const {  verifyJWT, verifyRefresh } = require('../middlewares');
authRouter.post('/sign-up', signUp)
authRouter.post('/login', login)
authRouter.post('/logout', logout)
// authRouter.get('/google-oauth', showGoogleOAuth)
// authRouter.get('/google-callback', handleGoogle)
// authRouter.get('/me', verifyJWT, exchangeJWTToUser)
// authRouter.get('/refresh', verifyRefresh, exchangeRefreshToken)

module.exports = authRouter