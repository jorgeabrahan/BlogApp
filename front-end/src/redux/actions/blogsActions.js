export const setBlogs = (blogs) => ({
  type: 'SET_BLOGS',
  payload: blogs
});

export const addBlog = (blog) => ({
  type: 'ADD_BLOG',
  payload: blog
});

export const updateBlog = (blog) => ({
  type: 'UPDATE_BLOG',
  payload: blog
});

export const deleteBlog = (blogId) => ({
  type: 'DELETE_BLOG',
  payload: blogId
});
