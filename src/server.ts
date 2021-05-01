import express from "express"
import chalk from "chalk"
import helmet from "helmet"
import morgan from "morgan"
import cors from 'cors'
import mongoose from 'mongoose'
import bookRoutes from './routes/book'

const app: any = express()
const PORT: number = 3000
const CONNECTION_URI: string = "mongodb://localhost:27017/book_ts";

// * Security & Primary
app.use(helmet())
app.use(morgan("dev"));
app.use(cors())
app.use(express.json());

// * Routing
app.use(bookRoutes);

// * Database Connection
mongoose.connect(CONNECTION_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}, (err) => {
    if (err) {
        console.log(chalk.red.inverse(err))
    }
    console.log(chalk.blueBright("MongoDB is Connected"))
});


app.get("/", (req: any, res: any, next: any) => {
    res.status(200).json({ succes: true, message: "Hello From NodeJS Typescript" })
})

app.listen(PORT, (err: any) => {
    if (err) {
        console.log(chalk.red.inverse(err))
    }
    console.log(chalk.green.inverse(`Server Up on Port: ${PORT}`))
})