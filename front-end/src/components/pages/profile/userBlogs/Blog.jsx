import React from 'react'
import { MainActionable } from '../../../actionables/MainActionable'
import { formatBlogDate } from '../../../../lib/utils/blogUtils'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { deleteBlog } from '../../../../redux/actions'
import { API_BASE_URL, MAIN_ACTIONABLE_STYLES } from '../../../../lib/utils/constants'
import { BinIcon, ChatBubbleEmptyIcon, PageEditIcon, ThumbsUpIcon } from '../../../../icons'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

export const Blog = ({ blog, belongsToAuthenticatedUser = true }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const removeBlogEntry = (blog) => {
    const { _id } = blog
    fetch(`${API_BASE_URL}/blogs/${_id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((jsonResponse) => {
        if (!jsonResponse.ok) {
          toast.error(jsonResponse.message)
          return
        }
        toast.success('Blog deleted successfully')
        dispatch(deleteBlog(_id))
      })
  }
  return (
    <div className='blog-wrapper'>
      {belongsToAuthenticatedUser || blog?.author?.alias == null ? (
        <p className='blog-author'>{blog?.author?.name}</p>
      ) : (
        <Link className='blog-author blog-author--link' to={`/user/${blog?.author?.alias}`}>
          {blog?.author?.name}
        </Link>
      )}
      <Link to={`/read-blog/${blog._id}`}>
        <h2 className='blog-title'>{blog.title}</h2>
      </Link>
      <p className='blog-brief-description'>{blog.briefDescription}</p>
      <section className='blog-footer'>
        <div className='blog-stats'>
          <p className='blog-date'>{formatBlogDate(blog.createdAt)}</p>
          <button className='blog-likes'>
            <ThumbsUpIcon size='18px' />
            <span>{blog.likes.length}</span>
          </button>
          <button className='blog-comments'>
            <ChatBubbleEmptyIcon size='16px' />
            <span>{blog.comments.length}</span>
          </button>
        </div>
        {belongsToAuthenticatedUser && (
          <div className='blog-actions'>
            <MainActionable
              isRound
              style={MAIN_ACTIONABLE_STYLES.OUTLINE}
              onClick={() => history.push(`/write-blog?blogToEdit=${blog._id}`)}
            >
              <PageEditIcon size='18px' />
            </MainActionable>
            <MainActionable
              isRound
              style={MAIN_ACTIONABLE_STYLES.OUTLINE}
              onClick={() => removeBlogEntry(blog)}
            >
              <BinIcon size='18px' />
            </MainActionable>
          </div>
        )}
      </section>
    </div>
  )
}
