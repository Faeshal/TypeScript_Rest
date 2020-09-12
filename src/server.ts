import express from "express"
import chalk from "chalk"
const app: any = express()
const PORT: number = 3000

app.get("/", (req: any, res: any, next: any) => {
    res.status(200).json({ succes: true, message: "Hello From Typescript" })
})


app.listen(PORT, (err: any) => {
    if (err) {
        console.log(chalk.red.inverse(err))
    }
    console.log(chalk.green.inverse(`Server Up on Port: ${PORT}`))
})