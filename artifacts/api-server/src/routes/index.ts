import { Router, type IRouter } from "express";
import healthRouter from "./health.js";
import authRouter from "./auth.js";
import foundersRouter from "./founders.js";
import uploadRouter from "./upload.js";
import categoriesRouter from "./categories.js";
import subCategoriesRouter from "./subcategories.js";

const router: IRouter = Router();

router.use(healthRouter);
router.use(authRouter);
router.use(foundersRouter);
router.use(uploadRouter);
router.use(categoriesRouter);
router.use(subCategoriesRouter);

export default router;
