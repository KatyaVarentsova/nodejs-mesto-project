import { Request } from 'express';

export interface AuthorizedRequest extends Request {
  user?: {
    _id: string;
  };
}

export const statusCode = {
  ok: 200,
  created: 201,
  badRequest: 400,
  notFound: 404,
  serverError: 500,
}

export const messageError = {
  badRequest: 'Запрос некорректный или неверный.',
  notFound: 'Запрошенный ресурс не был найден на сервере.',
  serverError: 'На сервере произошла внутренняя ошибка.'
}