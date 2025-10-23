import PostService from '../service/PostService.js';

const postService = new PostService();

export default class PostController {
    async createPost(req, res) {
        try {
            const { title, content } = req.body;
            if (!title || !content) {
                return res.status(400).json({
                    error: "ValidationError",
                    message: "Title and content are required"
                });
            }
            const newPost = await postService.createPost({ title, content });
            res.status(201).json({ newPost, message: "Content Posted" });
        }
        catch (error) {
            console.error("Error in PostController.createPost:", error);
            res.status(500).json({ error: "ServerError", message:"Failed to create post" });
        }
    }

    async deletePostById(req, res) {
        try {
            const { id } = req.body;
            if (!id) {
                return res.status(400).json({
                    error: "ValidationError",
                    message: "Blog Id is required"
                });
            }
            await postService.deletePostById({ id });
            res.status(200).json({ message: "post deleted" });

        } catch (error) {
            console.error("Error in PostController.deletePostById: ", error);
            res.status(500).json({ error: "ServerError", message:"Failed to delete post" });
        }
    }

    async getPosts(req, res) {
        try {
            const posts = await postService.getPosts();
            res.status(200).json({posts,message:"Post fetched"});
        } catch (error) {
            console.error("Error in PostController.getPosts:", error);
            res.status(500).json({ error: "ServerError", message:"Failed to retrieve post" });
        }
    }
}