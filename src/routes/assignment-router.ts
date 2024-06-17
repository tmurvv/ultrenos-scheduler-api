import { Router } from "express";

import { assignmentControllers } from "../controllers/assignments";

const router = Router();

router.put("/v1/assignments/:id", assignmentControllers.save);
router.delete("/v1/assignments/:id", assignmentControllers.del);
router.get("/v1/assignments", assignmentControllers.getAll);
router.get("/v1/assignments/:id", assignmentControllers.getOne);

export const assignmentRouter = router;
