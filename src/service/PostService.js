import PostRepository from "../repository/PostRepository.js";

const postRepository = new PostRepository();

export default class PostService {
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