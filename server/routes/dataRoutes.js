/**
 * @swagger
 * tags:
 *   name: Blogs
 *   description: API endpoints for managing blogs
 */


import express from "express";
import { addblog, getblogs, deleteblog, editblog, getblogbyId, getBlogCount } from "../controllers/blogControllers.js";
import { deletecom, addcom } from "../controllers/commentControllers.js";
import authMiddleware from "../middlewares/authMiddleware.js"


const dataRouter = express.Router();

/**
 * @swagger
 * /data/blog:
 *   get:
 *     summary: Get blogs
 *     description: Get a list of blogs with optional pagination using startIndex and endIndex query parameters.
 *     tags: [Blogs]
 *     parameters:
 *       - in: query
 *         name: startIndex
 *         schema:
 *           type: integer
 *         description: Index of the first blog to return (optional)
 *       - in: query
 *         name: endIndex
 *         schema:
 *           type: integer
 *         description: Index of the last blog to return (optional)
 *     responses:
 *       '200':
 *         description: Successfully retrieved blogs.
 *       '400':
 *         description: Invalid input.
 *       '500':
 *         description: Internal server error.
 */
dataRouter.get("/blog", getblogs);

/**
 * @swagger
 * /data/blogcount:
 *   get:
 *     summary: Get total number of blogs
 *     description: Get the total number of blogs in the database.
 *     tags: [Blogs]
 *     responses:
 *       '200':
 *         description: Successfully retrieved the total number of blogs.
 *       '500':
 *         description: Internal server error.
 */
dataRouter.get("/blogcount", getBlogCount);
//Protected Routes

/**
 * @swagger
 * /data/blog:
 *   post:
 *     summary: Create a new blog
 *     description: Create a new blog with the provided title, description, and postedBy.
 *     tags: [Blogs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               postedBy:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Blog created successfully.
 *       '500':
 *         description: Internal server error.
 */
dataRouter.post("/blog", authMiddleware, addblog);

/**
 * @swagger
 * /data/blog/{id}:
 *   get:
 *     summary: Get blog by ID
 *     description: Get a blog by its ID.
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the blog to retrieve
 *     responses:
 *       '200':
 *         description: Successfully retrieved the blog.
 *       '404':
 *         description: Blog not found.
 *       '500':
 *         description: Internal server error.
 */
dataRouter.get("/blog/:id", authMiddleware, getblogbyId);

/**
 * @swagger
 * /data/blog/{id}:
 *   delete:
 *     summary: Delete a blog by ID
 *     description: Delete a blog by its ID.
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the blog to delete
 *     responses:
 *       '200':
 *         description: Blog deleted successfully.
 *       '404':
 *         description: Blog not found.
 *       '500':
 *         description: Internal server error.
 */
dataRouter.delete("/blog/:id", authMiddleware, deleteblog);

/**
 * @swagger
 * /data/blog/{id}:
 *   patch:
 *     summary: Update a blog by ID
 *     description: Update a blog's title and description by its ID.
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the blog to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Blog updated successfully.
 *       '400':
 *         description: Blog not found or invalid input.
 *       '500':
 *         description: Internal server error.
 */
dataRouter.patch("/blog/:id", authMiddleware, editblog);

/**
 * @swagger
 * /api/blogs/{blog_id}/comment:
 *   post:
 *     summary: Add a new comment to a blog
 *     description: Add a new comment to the specified blog.
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: blog_id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the blog to add the comment to
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *               text:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Comment added successfully.
 *       '400':
 *         description: Invalid input data.
 *       '404':
 *         description: Blog not found.
 *       '500':
 *         description: Internal server error.
 */
dataRouter.post("/blog/:blog_id/comment", authMiddleware, addcom);

/**
 * @swagger
 * /api/blogs/{blog_id}/comment/{comment_id}:
 *   delete:
 *     summary: Delete a comment from a blog
 *     description: Delete a comment from the specified blog.
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: blog_id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the blog containing the comment
 *       - in: path
 *         name: comment_id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the comment to delete
 *     responses:
 *       '200':
 *         description: Comment deleted successfully.
 *       '404':
 *         description: Blog not found.
 *       '500':
 *         description: Internal server error.
 */
dataRouter.delete("/blog/:blog_id/comment/:comment_id", authMiddleware, deletecom);


export default dataRouter;