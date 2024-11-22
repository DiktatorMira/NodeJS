import { Router } from 'express';
import { AdvertisementController } from '../controllers/ad-controller';
import { verifyAdmin } from '../middlewares/auth-middleware';

export const advertisementRouter = Router();

advertisementRouter.post('/', verifyAdmin, AdvertisementController.create);
advertisementRouter.get('/', AdvertisementController.getAll);
advertisementRouter.get('/:id', AdvertisementController.getById);
advertisementRouter.put('/:id', verifyAdmin, AdvertisementController.update);
advertisementRouter.delete('/:id', AdvertisementController.delete);
advertisementRouter.get('/search', AdvertisementController.search);
advertisementRouter.patch('/:id/sold', AdvertisementController.markAsSold);