import { Router } from 'express';
import { 
    getCards, 
    postCard, 
    deleteCardId, 
    putCardsLikes, 
    deleteCardsLikes 
} from '../controllers/cards';

const router = Router();

router.get('/', getCards)
router.post('/', postCard)
router.delete('/:cardId', deleteCardId)
router.put('/:cardId/likes', putCardsLikes)
router.delete('/:cardId/likes', deleteCardsLikes)

export default router;