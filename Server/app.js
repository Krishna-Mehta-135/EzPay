import { express } from 'express';
import userRouter from './routers/user.routes.js'
import { cors } from 'cors';
import { accountRouter } from './routers/account.routes.js';

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json())

app.use('/api/v1/user', userRouter)
app.use('/api/v1/account', accountRouter)

export {app}    