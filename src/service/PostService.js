const postRepository = require("../repository/postRepository")

class PostService {
  async createPost(postData) {
    return await postRepository.create(postData);
  }

  async getPosts() {
    return await postRepository.findAll();
  }

  async deletePostById(id){
    return await postRepository.deleteById(id);
  }
}

module.exports = new PostService();
