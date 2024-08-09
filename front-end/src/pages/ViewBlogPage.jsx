import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { API_BASE_URL } from '../lib/utils/constants'
import { toast } from 'react-toastify'
import { getNameInitials } from '../lib/utils/userUtils'
import { formatBlogDate } from '../lib/utils/blogUtils'
import { MainLayout } from '../layouts'

export const ViewBlogPage = () => {
  const history = useHistory()
  const { blogId } = useParams()
  const [blogToView, setBlogToView] = useState({})
  useEffect(() => {
    const getBlog = async () => {
      fetch(`${API_BASE_URL}/blogs/${blogId}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then((response) => response.json())
        .then((jsonResponse) => {
          if (!jsonResponse.ok) {
            toast.error(jsonResponse.message)
            history.push('/')
            return
          }
          setBlogToView(jsonResponse.data)
        })
    }
    getBlog()
  }, [blogId, history])
  return (
    <MainLayout>
      <section className='view-blog-header'>
        <div className='user-name-bubble'>
          {getNameInitials(blogToView?.author?.name ?? '')}
        </div>
        <div>
          <p className='view-blog-author'>Written by {blogToView?.author?.name}</p>
          <p className='view-blog-date'>Created {formatBlogDate(blogToView?.createdAt)}</p>
          <p className='view-blog-date'>Last updated {formatBlogDate(blogToView?.updatedAt)}</p>
        </div>
      </section>
      <h1 className='view-blog-title'>{blogToView?.title}</h1>
      <p className='view-blog-brief-description'>{blogToView?.briefDescription}</p>
      <textarea className='view-blog-content' value={blogToView?.content} readOnly />
      <section className='view-blog-tags my-20'>
        {blogToView?.tags && blogToView?.tags?.map((tag) => <span key={tag._id}>{tag.title}</span>)}
      </section>
    </MainLayout>
  )
}
