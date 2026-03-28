import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/authRoutes.js'
import {authMiddleware} from "./middlewares/authMiddleware.js";
import moviesRoutes from "./routes/movies.routes.js";

const app = express()

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}))

app.use(express.json())

app.use(helmet())

app.use(morgan('dev'))

app.use(cookieParser())

app.get('/', (req, res) => {
    res.json({ message: '🎬 CineApp API funcionando' })
})
app.use('/api/auth', authRoutes)

app.get('/api/protected', authMiddleware, (req, res) => {
    res.json({ message: `Hola usuario ${req.userId}` })
})
app.use("/api/movies", moviesRoutes);

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})