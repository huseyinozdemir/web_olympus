import { Router, Request, Response, NextFunction } from 'express';
import { 
    getAllContact,
    addContact
} from "../controllers/contact";

const router = Router();


router.post(
    "/add",
    async (req: Request, res: Response, next: NextFunction) => {
        await addContact(req, res);
    }
);

router.get(
    "/list",
    async (req: Request, res: Response, next: NextFunction) => {
        await getAllContact(req, res);
    }
);
export default router;
