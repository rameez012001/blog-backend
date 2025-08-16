const postService = require('../service/PostService');

class PostController {
    async createPost(req, res) {
        const postData = req.body;
        try{
            const newPost = await postService.createPost(postData);
            res.status(201).json(newPost);
        }
        catch(error){
            console.error("Error in PostController.createPost:", error);
            res.status(500).json({ error: "Failed to create post" });
        }
    }

    async getPosts(req, res) {
        try {
            const posts = await postService.getPosts();
            res.status(200).json(posts);
        } catch (error) {
            console.error("Error in PostController.getPosts:", error);
            res.status(500).json({ error: "Failed to retrieve posts" });
        }
    }
}

module.exports = new PostController();