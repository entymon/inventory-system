import { Router } from 'express';

import { add } from 'controllers/products';

const router = Router();

router.post('/', [], add);

export default router;
