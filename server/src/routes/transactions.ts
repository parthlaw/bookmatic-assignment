import { Router } from "express";
import controllers from "../controllers";
const app=Router();
app.post('/create',controllers.middleware.checkToken,controllers.transactions.create);
app.get('/list',controllers.middleware.checkToken,controllers.transactions.list);
export default app;
