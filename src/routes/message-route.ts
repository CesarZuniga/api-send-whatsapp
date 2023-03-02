import { Router } from "express";
import { MessageController } from "../controllers/message-controller";




export  class MessageRoute {
  static CreateRoutes(router: Router): Router{
    router.post("/message", async (_req, res) => {
      const controller = new MessageController();
      const response = await controller.sendMessage(_req.body);
      return res.send(response);
    });
    router.get("/message/login", async (_req, res) => {
      const controller = new MessageController();
      const response = await controller.Login();
      return res.send(response);
    });
    router.get("/message/logout", async (_req, res) => {
      const controller = new MessageController();
      const response = await controller.Logout();
      return res.send(response);
    });
    return router;
  } 
}