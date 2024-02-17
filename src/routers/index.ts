import { Router } from 'express';
const router = Router();
import contactRouter from './contact';

router.use("/contact", contactRouter);
export default router;
