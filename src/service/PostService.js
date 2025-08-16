const Post = require("../entity/Post");

class PostService {
  async createPost(postData) {
    try {
      return await Post.create(postData);
    } catch (error) {
      console.error("Error creating post:", error);
      throw error;
    }
  }

  async getPosts() {
    try {
      return await Post.findAll();
    } catch (error) {
      console.error("Error retrieving posts:", error);
      throw error;
    }
  }
}

module.exports = new PostService();
