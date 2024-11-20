const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const UserModel = require('../models/user')
const jwt = require('jsonwebtoken')
const axios = require('axios')
const { signJWT } = require('../utils')
// const UserModel = require('../models/user.js')
const signUp = asyncHandler(async (req, res) => {
    const { firstname, lastname, email, password, confirmPassword } = req.body
    if (password !== confirmPassword) {
        throw new Error("Password not matched!!!!")
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const username = Date.now() + firstname

    const user = new UserModel({
        username: username,
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: hashedPassword
    })

    const result = await user.save()
    delete result.password
    return res.json(result)
})
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await UserModel.findOne({ email: email })
   
    if (!user) {
        return res.status(404).json("User not found!")
    }
    if (user.type == "sso") {
        return res.status(405).json("Only Password User Allowed")
    }
    const compareResult = await bcrypt.compare(password, user.password)
    if (!compareResult) {
        return res.status(401).json("Incorrect email or password")
    }
    const token = signJWT(user._id, user.email, user.username)
    const hashedToken = await bcrypt.hash(token.refreshToken, 10)
    user.refreshToken = hashedToken
    user.save()
    return res.json(token)
})
const handleGoogle = asyncHandler(async (req, res) => {
    // Get one time code from OAuth Server
    const { code } = req.query
    // Exchange code with Goolge API server
    console.log("Code",code)
    const { data } = await axios.post('https://oauth2.googleapis.com/token', {
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_REDIRECT_URL,
        grant_type: 'authorization_code',
    })
   
    // User Aceess token (JWT) from Goolge API to request user information
    const { access_token } = data;
    const response = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo`,
        {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
    const userprofile = response.data;
    const {email, name} = userprofile
    const checkUser = await UserModel.findOne({email})
    console.log("User"+ checkUser)

    const username = Date.now() +  email.split('@')[0];
    if(!checkUser){
        const user = new UserModel({
            username: username,
            firstname: name,
            lastname: "",
            email: email,
            type:"sso"
            
        })
         const result = await user.save()
        const token = signJWT(result._id, result.email, result.username)
        return res.json(token )
    }
    const token = signJWT(checkUser._id, checkUser.email, checkUser.username)
    return res.json( token )

    // Register in our data
    //return res.json(userprofile)
   // return res.json({ token })
})

const showGoogleOAuth = (req, res) => {
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${process.env.GOOGLE_REDIRECT_URL}&response_type=code&scope=openid%20profile%20email&access_type=offline`;
    return res.redirect(googleAuthUrl)
}
const exchangeJWTToUser = asyncHandler(async (req, res) => {
    console.log(req.user)
    return res.json(req.user)
})
const exchangeRefreshToken = asyncHandler(async (req, res) => {
    // Validate Refresh Token
    console.log(req.user)
    const encodedToken = req.user.extract
    const compareResult = await bcrypt.compare(encodedToken, req.user.refreshToken)
    if (!compareResult) {
        return res.status(401).json("Incorrect token")
    }

    // Sign JWT Token
    const token = signJWT(req.user._id, req.user.email, req.user.username)

    // Save refresh in database

    const hashedToken = await bcrypt.hash(token.refreshToken, 10)

    const user = await UserModel.findById(req.user._id)
    user.refreshToken = hashedToken
    user.save()
    // req.user.refreshToken = hashedToken
    // req.user.save()

    return res.json(token)
})

module.exports = { signUp, login, showGoogleOAuth, handleGoogle, exchangeJWTToUser, exchangeRefreshToken}

