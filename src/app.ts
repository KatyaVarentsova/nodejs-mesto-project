import express, 
{ 
  Request,
  Response, 
  NextFunction 
} from 'express';
import mongoose from 'mongoose';
import usersRouter from './routes/users';
import cardsRouter from './routes/cards';
import { 
  AuthorizedRequest, 
  messageError, 
  statusCode 
} from './types';
import { 
  createUser, 
  loginUser 
} from './controllers/users';
import auth from './middlewares/auth';
import cors from 'cors';
import { 
  requestLogger, 
  errorLogger 
} from './middlewares/logger';
import errorHandler from './middlewares/errors';
import validateRequest from './middlewares/validate';
import { createUserSchema, loginUserSchema } from './validators/user';

const { PORT = 3000 } = process.env;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const allowedOrigins = [
  'http://localhost:8080',
  'https://your-frontend-domain.ru', // для деплоя 
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true, // для куки
  allowedHeaders: ['Content-Type', 'Authorization'], // для JWT в заголовке (с этим работаю сейчас)
  methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE'],
}));

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(requestLogger);

app.post('/signin', validateRequest(loginUserSchema), loginUser);
app.post('/signup', validateRequest(createUserSchema), createUser);
app.use(auth);
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use('*', (req: Request, res: Response) => {
  res.status(statusCode.notFound).send({ message: messageError.notFound });
});

app.use(errorLogger); 

app.use(errorHandler);

app.listen(PORT, () => { 
    console.log(`http://localhost:${PORT}`) 
})