import dotenv from 'dotenv'
import connectDB from './db/db.js'
import { app } from './app.js'
import { createServer } from 'http'
import { Server } from 'socket.io'

const port = process.env.PORT || 3000

dotenv.config({
    path: './.env',
})

const server = createServer(app)

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
})

connectDB()
    .then(() => {
        server.listen(port, () => {
            console.log(`Express server listening at port no.: ${port}`)
        })
    })
    .catch((err) => console.log('MongoDB connection failed: ', err))

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id)

    socket.on('joinRoom', ({ serviceRequestId }) => {
        socket.join(serviceRequestId)
        console.log(`User ${socket.id} joined room: ${serviceRequestId}`)
    })

    socket.on('sendMessage', ({ serviceRequestId, sender, message }) => {
        const newMessage = { sender, message, time: new Date() }
        io.to(serviceRequestId).emit('receiveMessage', newMessage)
    })

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id)
    })
})

const dataArray = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' },
]

app.get('/api', (req, res) => {
    console.log('API hit at', new Date().toLocaleTimeString())
    res.json(dataArray)
})
