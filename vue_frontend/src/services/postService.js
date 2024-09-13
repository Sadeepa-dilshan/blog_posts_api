// src/services/postService.js

import axios from 'axios';

// Get all posts
export function getPosts() {
  return axios.get('/posts');
}

// Get a single post by ID
export function getPostById(id) {
  return axios.get(`/posts/${id}`);
}

// Create a new post
export function createPost(postData) {
  return axios.post('/posts', postData);
}

// Update a post by ID
export function updatePost(id, postData) {
  return axios.put(`/posts/${id}`, postData);
}

// Delete a post by ID
export function deletePost(id) {
  return axios.delete(`/posts/${id}`);
}
