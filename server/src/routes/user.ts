import { Router } from "express";
import controllers from "../controllers";
const app=Router();
app.post('/register',controllers.user.register);
app.post('/login',controllers.user.login);
app.get('/logout',controllers.user.logout);
export default app;