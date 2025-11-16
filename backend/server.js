import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import connectDb from './config/connectDb.js'
import { userRouter } from './routes/userRoute.js'
import {
  errorConvertor,
  errorHandler,
  notFound
} from './middleware/errorHandler.js'
import clientRouter from './routes/clientRoute.js'
import { invoiceRouter } from './routes/invoiceRoute.js'
import { invoiceItemRouter } from './routes/invoiceItemRouter.js'
import { notificationRouter } from './routes/notificationRouter.js'

await connectDb()

const app = express()
const port = process.env.PORT
const frontendUrl = process.env.FRONTEND_URL

// middlewares
app.use(cors({ origin: frontendUrl }))
app.use(express.json())

//routes
app.use('/api/users', userRouter)
app.use('/api/clients', clientRouter)
app.use('/api/invoices', invoiceRouter)
app.use('/api/items', invoiceItemRouter)
app.use('/api/notifications', notificationRouter)

// error middleware
app.use(notFound)
app.use(errorConvertor)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
