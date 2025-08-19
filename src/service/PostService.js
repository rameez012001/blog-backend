const postRepository = require("../repository/postRepository")

class PostService {
  async createPost(postData) {
    return await postRepository.create(postData);
  }

  async getPosts() {
    return await postRepository.findAll();
  }
}

module.exports = new PostService();
