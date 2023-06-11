import { Router } from 'express';

import { add } from 'controllers/products';
import { checkJwt } from 'middleware/checkJwt';
import { checkRole } from 'middleware/checkRole';

const router = Router();

router.post('/', [checkJwt, checkRole(['ADMINISTRATOR'])], add);

export default router;
