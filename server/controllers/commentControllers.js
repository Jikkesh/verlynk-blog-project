import blogs from "../models/blog.js"



export const addcom = async (req, res) => {

    try {
        const { blog_id } = req.params;
        const { userName, text } = req.body;

        const blog = await blogs.findById(blog_id);
        if (!blog) {
            return res.status(404).json({ status: 404, message: "BLOG_NOTEXIST" });
        }

        if (!text || !userName) {
            return res.status(400).json({ status: 400, message: "Invalid input data" });
        }

        const comment = {
            text: text,
            commentedBy: userName,
        }

        blog.comments.push(comment);
        await blog.save();

        return res.status(200).json({ status: 200, message: "COMMENT_ADDED" });

    } catch (error) {
        return res.status(500).json({ status: 500, message: "SERVER_ERROR", message: error.message });
    }
}

export const deletecom = async (req, res) => {
    const { blog_id, comment_id } = req.params;

    try {

        const blog = await blogs.findById(blog_id);
        if (!blog) {
            return res.status(404).json({ status: 404, message: "Blog not found" });
        }

        blog.comments.splice(comment_id, 1);
        await blog.save();

        res.status(200).json({ status: 200, message: "Comment deleted successfully", data: blog });

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}