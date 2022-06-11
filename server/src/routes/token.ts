import { Router } from "express";
import controllers from "../controllers";
const app=Router();
app.get("/getAuth",controllers.middleware.checkToken,controllers.token.getAuth);
app.get("/refresh",controllers.token.refresh);
export default app;