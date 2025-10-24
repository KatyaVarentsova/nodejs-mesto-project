import { 
    Request, 
    Response 
} from 'express';
import User from '../models/user'
import { 
    AuthorizedRequest, 
    messageError, 
    statusCode 
} from '../types';

export const getUsers = (req: Request, res: Response) => {
    return User.find({})
        .then(users => res.status(statusCode.ok).send({ data: users }))
        .catch(() => res.status(statusCode.serverError).send({ message: messageError.serverError }))
}

export const getUserId = (req: Request, res: Response) => {
    const { userId } = req.params;
    return User.findById(userId)
        .then((user) => {
            if (!user) {
                return res.status(statusCode.notFound).send({ message: messageError.notFound });
            }
            res.status(statusCode.ok).send({ data: user })
        })
        .catch((err) => {
            if (err.name === 'CastError') {
                return res.status(statusCode.badRequest).send({ message: messageError.badRequest })
            }
            res.status(statusCode.serverError).send({ message: statusCode.serverError })
        })
}

export const postUser = (req: Request, res: Response) => {
    const { name, about, avatar } = req.body;
    return User.create({ name, about, avatar })
        .then(user => res.status(statusCode.created).send({ data: user }))
        .catch((err) => {
            if (err.name === 'ValidationError') {
                return res.status(statusCode.badRequest).send({
                    message: messageError.badRequest,
                });
            }
            res.status(statusCode.serverError).send({ message: statusCode.serverError })
        });
}

export const patchUser = (req: AuthorizedRequest, res: Response) => {
    const { name, about } = req.body;
    const userId = req.user?._id;

    return User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
        .then((user) => {
            if (!user) {
                return res.status(statusCode.notFound).send({ message: messageError.notFound });
            }
            res.status(statusCode.ok).send({ data: user })
        })
        .catch((err) => {
            if (err.name === 'ValidationError') {
                return res.status(statusCode.badRequest).send({
                    message: messageError.badRequest,
                });
            }
            res.status(statusCode.serverError).send({ message: statusCode.serverError })
        });
}

export const patchUserAvatar = (req: AuthorizedRequest, res: Response) => {
    const { avatar } = req.body;
    const userId = req.user?._id;

    return User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
        .then((user) => {
            if (!user) {
                return res.status(statusCode.notFound).send({ message: messageError.notFound });
            }
            res.status(statusCode.ok).send({ data: user })
        })
        .catch((err) => {
            if (err.name === 'ValidationError') {
                return res.status(statusCode.badRequest).send({
                    message: messageError.badRequest,
                });
            }
            res.status(statusCode.serverError).send({ message: statusCode.serverError })
        });
}