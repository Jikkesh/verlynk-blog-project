import express from "express";
import { addblog, getblogs, deleteblog, editblog, getblogbyId, getBlogCount } from "../controllers/blogControllers.js";
import { deletecom, addcom } from "../controllers/commentControllers.js";
import authMiddleware from "../middlewares/authMiddleware.js"


const dataRouter = express.Router();


dataRouter.get("/blog", getblogs)


dataRouter.get("/blogcount", getBlogCount)

//Protected Routes

dataRouter.post("/blog", authMiddleware, addblog)



dataRouter.get("/blog/:id", authMiddleware, getblogbyId)


dataRouter.delete("/blog/:id", authMiddleware, deleteblog);


dataRouter.patch("/blog/:id", authMiddleware, editblog);


dataRouter.post("/blog/:blog_id/comment", authMiddleware, addcom);


dataRouter.delete("/blog/:blog_id/comment/:comment_id", authMiddleware, deletecom);


export default dataRouter;