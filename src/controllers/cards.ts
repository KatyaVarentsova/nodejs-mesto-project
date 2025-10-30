import { 
    NextFunction,
    Request, 
    Response 
} from 'express';
import Card from '../models/card'
import { 
    AuthorizedRequest, 
    messageError, 
    statusCode 
} from '../types';

export const getCards = (req: Request, res: Response, next: NextFunction) => {

    return Card.find({})
        .then(cards => res.status(statusCode.ok).send({ data: cards }))
        .catch(next);
}

export const postCard = (req: AuthorizedRequest, res: Response, next: NextFunction) => {
    const { name, link } = req.body;
    const owner = req.user?._id;

    return Card.create({ name, link, owner })
        .then(card => res.status(statusCode.created).send({ data: card }))
        .catch((err) => {
            if (err.name === 'ValidationError') {
                return res.status(statusCode.badRequest).send({
                    message: messageError.badRequest,
                });
            }
            next(err)
        });
}

export const deleteCardId = (req: AuthorizedRequest, res: Response, next: NextFunction) => {
    const { cardId } = req.params;
    const userId = req.user?._id;

    return Card.findByIdAndDelete(cardId)
        .then((card) => {
            if (!card) {
                return res.status(statusCode.notFound).send({ message: messageError.notFound });
            }
            if ((String(card.owner) !== userId)) {
                return res.status(403).send({ message: 'Нельзя удалять чужие карточки' });
            }
            res.status(statusCode.ok).send({ message: 'Карточка успешно удалена.' })
        })
        .catch((err) => {
            if (err.name === 'CastError') {
                return res.status(statusCode.badRequest).send({ message: messageError.badRequest })
            }
            next(err)
        })
}

export const putCardsLikes = (req: AuthorizedRequest, res: Response, next: NextFunction) => {
    const { cardId } = req.params;
    const userId = req.user?._id;

    return Card.findByIdAndUpdate(
        cardId,
        { $addToSet: { likes: userId } },
        { new: true },
    )
        .then((card) => {
            if (!card) {
                return res.status(statusCode.notFound).send({ message: messageError.notFound });
            }
            res.status(statusCode.ok).send({ data: card })
        })
        .catch((err) => {
            if (err.name === 'CastError' || err.name === 'ValidationError') {
                return res.status(statusCode.badRequest).send({ message: messageError.badRequest })
            }
            next(err)
        })
}

export const deleteCardsLikes = (req: AuthorizedRequest, res: Response, next: NextFunction) => {
    const { cardId } = req.params;
    const userId = req.user?._id;

    return Card.findByIdAndUpdate(
        cardId,
        { $pull: { likes: userId } },
        { new: true },
    )
        .then((card) => {
            if (!card) {
                return res.status(statusCode.notFound).send({ message: messageError.notFound });
            }
            res.status(statusCode.ok).send({ message: 'Лайк успешно удалён.' })
        })
        .catch((err) => {
            if (err.name === 'CastError' || err.name === 'ValidationError') {
                return res.status(statusCode.badRequest).send({ message: messageError.badRequest })
            }
            next(err)
        })
}