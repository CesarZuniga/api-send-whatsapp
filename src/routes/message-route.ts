import { Router } from "express";
import { MessageController } from "../controllers/message-controller";
export  class MessageRoute {
  static CreateRoutes(router: Router): Router{
    router.post("/message", async (_req, res) => {
      const controller = new MessageController();
      const response = await controller.sendMessage(_req.body);
      return res.send(response);
    });
    router.get("/message", async (_req, res) => {
      const controller = new MessageController();
      const response = await controller.SendMsg(`${_req.query['msg']}`,`${_req.query['number']}` );
      return res.send(response);
    });
    return router;
  } 
}