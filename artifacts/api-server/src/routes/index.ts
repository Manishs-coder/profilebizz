import { Router, type IRouter } from "express";
import healthRouter from "./health.js";
import authRouter from "./auth.js";
import foundersRouter from "./founders.js";
import uploadRouter from "./upload.js";
import storageRouter from "./storage.js";
import categoriesRouter from "./categories.js";
import subCategoriesRouter from "./subcategories.js";
import backupRouter from "./backup.js";

const router: IRouter = Router();

router.use(healthRouter);
router.use(authRouter);
router.use(foundersRouter);
router.use(uploadRouter);
router.use(storageRouter);
router.use(categoriesRouter);
router.use(subCategoriesRouter);
router.use(backupRouter);

export default router;
