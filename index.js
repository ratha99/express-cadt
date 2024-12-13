require("dotenv").config()
const expree = require("express")
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require("socket.io");
const chatModel= require("./src/models/chat.js")
const rateLimit = require("express-rate-limit")
const { RedisStore } = require('rate-limit-redis')
const bodyParser  = require("body-parser")
const bookRouter = require('./src/routes/book.js')
const coursesRouter = require('./src/routes/course.js')
const userRoturer = require('./src/routes/user.js')
const authRouter = require('./src/routes/auth.js')
const chatRoute = require('./src/routes/chat.js')
const serviceRouter = require('./src/routes/service.js')
const passport = require('passport')
const jwtStrategy = require('./src/common/strategy/jwt.js')
const redisClient = require('./src/redis/index.js');
const { logger, handleError,verifyJWT,handleValidation, cacheMiddleware, cacheInterceptor, invalidateInterceptor } = require('./src/middlewares/index.js')
const app = expree()
const dbConnect = require('./src/db/db.js')
const fileRouter = require('./src/routes/file.js');
const { Redis } = require('ioredis')
const setupSwagger = require('./src/swagger/index.js');
const { createAdapter } = require("@socket.io/redis-adapter")
const cors = require('cors')
app.use(cors());
dbConnect()
redisClient.connect()
const pubClient = new Redis({
    port: 6379, // Redis port
    host: process.env.CACHE_SERVER, // Redis host
});
const subClient = pubClient.duplicate();
const server = createServer(app, (req, res) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
        'Access-Control-Max-Age': 2592000, // 30 days
        /** add other headers as per requirement */
    }

    if (req.method === 'OPTIONS') {
        res.writeHead(204, headers)
        res.end()
        return
    }

    if (['GET', 'POST'].indexOf(req.method) > -1) {
        res.writeHead(200, headers)
        // console.log("Hello World")
        res.end('Hello World')
        return
    }

    res.writeHead(405, headers)
    res.end(`${req.method} is not allowed for the request.`)
});
const io = new Server(server, {
    cors: {
        origin: '*'
    },
    adapter: createAdapter(pubClient, subClient)
});


const version = process.env.API_VERSION
// protocol: http, express
app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'))
})

// protocal: websocket, socket.io
io.on('connection', (socket) => {
    console.log(`${socket.id} connected`);
    socket.on('send-message', async (payload) => {
        // Recieve
        // Save chat to DB
       
        const chat = new chatModel(payload)
        const result = await chat.save()
        console.log("Chat", result)
        await chat.populate('byUser')
        io.emit('re-message', chat)
    })
});

  
const limiter = rateLimit({
    store:new RedisStore({
        sendCommand: (...args ) => redisClient.sendCommand(args),
    }),
    windowMs: 1 * 60 * 1000, // 1 minutes
    max: 30, // Limit each IP to 30 requests per windowMs
    message: {"msg":"To many request"}
  })
  const loginLimiter = rateLimit({
    store:new RedisStore({
        sendCommand: (...args ) => redisClient.sendCommand(args),
    }),
    windowMs: 1 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 100 requests per windowMs
    message: {"msg":"To many login request"}
  })

passport.use(jwtStrategy)
// app.get('/', (req, res) => {
//     return res.sendFile(path.join(__dirname, 'frontend/dist/index.html'))
// })
// 
//app.use(logger)
// app.use(limiter)
app.use(bodyParser.json())

app.use(`/${version}/auth`, authRouter)
// app.use(`/${version}/auth`, authRouter)

app.use(`/${version}/services`, 
    serviceRouter)
// app.use(cacheMiddleware)
// app.use(cacheInterceptor(30 * 60))
// app.use(invalidateInterceptor)
app.use("/heath-check", (req,res)=>{
    res.json("Pass")
})
app.use(`/${version}/book`,
    cacheMiddleware,cacheInterceptor(30 * 60),
    invalidateInterceptor,
    passport.authenticate('jwt', { session: false }),
    bookRouter)

app.use(`/${version}/course`,
    cacheMiddleware,
    cacheInterceptor(30 * 60),
    invalidateInterceptor,
    verifyJWT,
     coursesRouter)
app.use(`/${version}/user`,
    cacheMiddleware,
    cacheInterceptor(30 * 60),
    invalidateInterceptor, userRoturer)

setupSwagger(app)

app.use(`/${version}/chat`, chatRoute)
app.use(`/${version}/files`, fileRouter)

// app.get('/', (req,res)=>{
//     return res.json("Hello1")
// })
app.use(handleError)
const PORT = process.env.PORT || 4000;
server.listen(PORT, function(){
    console.log("Server is running on port 4000")
})