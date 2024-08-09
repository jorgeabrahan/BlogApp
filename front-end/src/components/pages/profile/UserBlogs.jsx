import React from 'react'
import { useSelector } from 'react-redux'
import { Blog } from './userBlogs/Blog'

export const UserBlogs = ({ publicUserBlogs, showPublicUserBlogs = false }) => {
  const blogs = useSelector((state) => state.blogs.blogs)
  const blogsToRender = showPublicUserBlogs ? publicUserBlogs : blogs
  return (
    <section className='user-blogs'>
      {blogsToRender.map((blog) => (
        <Blog key={blog._id} blog={blog} belongsToAuthenticatedUser={!showPublicUserBlogs} />
      ))}
      {blogsToRender.length === 0 && (
        <p className='no-blogs'>
          {showPublicUserBlogs ? 'This user has no blog posts' : "You haven't created any blog yet"}
        </p>
      )}
    </section>
  )
}
