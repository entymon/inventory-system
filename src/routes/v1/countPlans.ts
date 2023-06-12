import { Router } from 'express';

import { create } from 'controllers/countPlans';
import { checkJwt } from 'middleware/checkJwt';
import { checkRole } from 'middleware/checkRole';

const router = Router();

router.post('/', [checkJwt, checkRole(['ADMINISTRATOR'])], create);

export default router;
