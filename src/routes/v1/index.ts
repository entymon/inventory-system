import { Router } from 'express';

import auth from './auth';
import countPlans from './countPlans';
import products from './products';
import users from './users';

const router = Router();

router.use('/auth', auth);
router.use('/users', users);
router.use('/products', products);
router.use('/count-plans', countPlans);

export default router;
