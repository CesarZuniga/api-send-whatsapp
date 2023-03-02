import express from "express";
import { MessageRoute } from "./message-route";


const router = express.Router();
MessageRoute.CreateRoutes(router);

export default router;