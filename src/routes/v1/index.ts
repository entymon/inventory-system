import { Router } from 'express';

import auth from './auth';
import products from './products';
import users from './users';

const router = Router();

router.use('/auth', auth);
router.use('/users', users);
router.use('/products', products);

export default router;
