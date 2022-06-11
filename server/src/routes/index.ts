import { Router } from "express";
import user from "./user";
import transactions from "./transactions";
import token from "./token";
const app = Router();
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.use('/user',user);
app.use('/transactions',transactions);
app.use('/token',token);
export default app;