import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/authRoutes.js'
import {authMiddleware} from "./middlewares/authMiddleware.js";
import moviesRoutes from "./routes/movies.routes.js";
import {errorHandler} from "./middlewares/errorHandler.js";
import watchlistRouter from "./routes/watchlist.routes.js"
import reviewsRouter from "./routes/review.routes.js"

const app = express()

app.use(cors({
    origin: true,
    credentials: true
}))

app.use(express.json())

app.use(helmet())

app.use(morgan('dev'))

app.use(cookieParser())

app.use(cors({
    origin: "https://pelis4u-project.vercel.app",
    credentials: true
}))
app.get('/', (req, res) => {
    res.json({ message: '🎬 CineApp API funcionando' })
})
app.use('/api/auth', authRoutes)

app.get('/api/protected', authMiddleware, (req, res) => {
    res.json({ message: `Hola usuario ${req.userId}` })
})
app.use("/api/movies", moviesRoutes);

app.use("/api/watchlist", watchlistRouter);

app.use("/api/reviews", reviewsRouter);

app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})