import blogs from "../models/blog.js"


export const addblog = async (req, res) => {
    try {
        const { title, description, postedBy } = req.body;
        const addBlog = await blogs.create({ title: title, description: description, postedBy: postedBy, comments: [] });
        res.status(200).json({ status: 200, message: "BLOG_CREATED", result: addBlog });

    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
    }

}

export const getblogs = async (req, res) => {

    try {
        const { startIndex, endIndex } = req.query;

        if (startIndex && endIndex) {
            const blogData = await blogs.find().skip(startIndex).limit(endIndex);
            return res.status(200).json({ status: 200, data: blogData });
        }
        else {
            return res.status(400).json({ status: 400, message: "INVALID_INPUT" })
        }

    } catch (error) {
        return res.status(500).json({ status: 500, message: error.message });
    }
}

export const getBlogCount = async (req, res) => {

    try {
        const total = await blogs.countDocuments()
        return res.status(200).json({ status: 200, data: total })
    } catch (error) {
        return res.status(500).json({ status: 500, message: error.message });
    }
}



export const getblogbyId = async (req, res) => {
    const { id: _id } = req.params;
    try {
        const blog = await blogs.findById(_id);

        if (!blog) {
            return res.status(404).json({ status: 404, message: "BLOG_NOTEXIST" })
        }

        return res.status(200).json({ status: 200, data: blog });

    } catch (error) {
        return res.status(500).json({ status: 500, message: error.message })

    }
}

export const deleteblog = async (req, res) => {
    try {
        const { id: _id } = req.params;
        const blog = await blogs.findById(_id);

        if (!blog) {
            return res.status(404).json({ status: 404, message: "BLOG_NOTEXIST" })
        }

        await blogs.findByIdAndRemove(_id);

        return res.status(200).json({ status: 200, message: `BLOG_DELETED` });
    } catch (error) {
        return res.status(500).json({ status: 500, message: "SERVER_ERROR" });
    }
}

export const editblog = async (req, res) => {

    try {
        const { id: _id } = req.params;
        const { title, description } = req.body;

        const idCheck = await blogs.findById(_id);
        if (!idCheck) {
            return res.status(404).json({ status: 400, message: "BLOG_NOTEXIST" });
        }

        await blogs.findByIdAndUpdate(_id,
            {
                title: title,
                description: description,
            },
            { new: true });

        return res.status(200).json({ status: 200, message: "BLOG_UPDATED" });

    } catch (error) {
        res.status(500).json({ status: 500, message: "SERVER_ERROR" });
    }
}