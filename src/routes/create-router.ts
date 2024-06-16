import { Router } from "express";

import { RouteObject } from "../Interfaces";

export const createRouter = (name: string, controllers: RouteObject) => {
  const router = Router();

  router.delete(`/v1/${name}/:id`, controllers.del);
  router.get(`/v1/${name}`, controllers.getAll);
  router.get(`/v1/${name}/:id`, controllers.getOne);
  router.post(`/v1/${name}/:id`, controllers.save);

  return router;
};
