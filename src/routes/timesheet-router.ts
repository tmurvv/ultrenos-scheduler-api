import { Router } from "express";

import { timesheetControllers } from "../controllers/timesheets";

const router = Router();

router.put("/v1/timesheets/:id", timesheetControllers.save);
router.get("/v1/timesheets/:id", timesheetControllers.getAllByUser);
router.delete("/v1/timesheets/:id", timesheetControllers.del);
router.get("/v1/timesheets", timesheetControllers.getAll);

export const timesheetRouter = router;
