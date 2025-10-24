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

const { PORT = 3000 } = process.env;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use((req: AuthorizedRequest, res: Response, next: NextFunction) => {
  req.user = {
    _id: '68fa568387259b69ab4fea45'
  };

  next();
});

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use('*', (req: Request, res: Response) => {
  res.status(statusCode.notFound).send({ message: messageError.notFound });
});

app.listen(PORT, () => { 
    console.log(`http://localhost:${PORT}`) 
})