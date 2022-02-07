import { Router } from 'express';
import { router as v1 } from './routes/v1-get-expenses';

export const router = Router();

// versioning and exposing endpoint: '/get-user-expense' on 'expense/v1'
router.use('/v1', v1);
