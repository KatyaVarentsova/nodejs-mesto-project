import {
    NextFunction,
    Request,
    Response
} from 'express';
import User from '../models/user'
import {
    AuthorizedRequest,
    messageError,
    statusCode
} from '../types';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const createUser = (req: Request, res: Response, next: NextFunction) => {
    const {
        name, about, avatar, email, password
    } = req.body;

    return bcrypt.hash(password, 10)
        .then((hash: string) => User.create({
            name, about, avatar, email, password: hash
        }))
        .then(user => {
            const {password, ...userResponse} = user.toObject();
            res.status(statusCode.created).send({ data: userResponse }
            )
        }
        )
        .catch((err) => {
            if (err.name === 'ValidationError') {
                return res.status(statusCode.badRequest).send({
                    message: messageError.badRequest,
                });
            }
            if (err.code === 11000) {
                return res.status(409).send({
                    message: 'Пользователь с таким email уже существует',
                });
            }
            next(err)
        });
}

export const loginUser = (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    return User.findUserByCredentials(email, password)
        .then((user) => {
            const token = jwt.sign({ _id: user._id }, 'super-strong-secret', { expiresIn: '7d' });
            res.cookie('jwt', token, {
                httpOnly: true,
                secure: true,
                maxAge: 3600000 * 24 * 7,
            })
                .send({ token });
        })
        .catch(next);
};

export const getUsers = (req: Request, res: Response, next: NextFunction) => {
    return User.find({})
        .then(users => res.status(statusCode.ok).send({ data: users }))
        .catch(next);
}

export const getUserMe = (req: AuthorizedRequest, res: Response, next: NextFunction) => {
    const userId = req.user?._id;
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
            next(err)
        })
}

export const getUserId = (req: Request, res: Response, next: NextFunction) => {
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
            next(err)
        })
}

export const patchUser = (req: AuthorizedRequest, res: Response, next: NextFunction) => {
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
            next(err)
        });
}

export const patchUserAvatar = (req: AuthorizedRequest, res: Response, next: NextFunction) => {
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
            next(err)
        });
}