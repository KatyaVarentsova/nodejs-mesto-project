import { 
    Request, 
    Response, 
    NextFunction 
} from 'express';

interface IErr {
    statusCode?: number,
    message?: string
}

const errorHandler = (err:IErr, req: Request, res:Response, next:NextFunction) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({ 
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message
    });
}; 

export default errorHandler;