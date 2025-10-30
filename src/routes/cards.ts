import { Router } from 'express';
import { 
    getCards, 
    postCard, 
    deleteCardId, 
    putCardsLikes, 
    deleteCardsLikes 
} from '../controllers/cards';
import validateRequest from '../middlewares/validate';
import { 
    cardIdSchema, 
    postCardSchema 
} from '../validators/card';

const router = Router();

router.get('/', getCards)
router.post('/', validateRequest(postCardSchema), postCard)
router.delete('/:cardId', validateRequest(cardIdSchema), deleteCardId)
router.put('/:cardId/likes', validateRequest(cardIdSchema), putCardsLikes)
router.delete('/:cardId/likes', validateRequest(cardIdSchema), deleteCardsLikes)

export default router;