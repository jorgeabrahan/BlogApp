import React, { useEffect, useState } from 'react'
import { MainLayout } from '../layouts'
import { API_BASE_URL, MAIN_ACTIONABLE_STYLES } from '../lib/utils/constants'
import { toast } from 'react-toastify'
import { Blog } from '../components/pages/profile/userBlogs/Blog'
import { useDispatch, useSelector } from 'react-redux'
import { getNameInitials, isFollowing } from '../lib/utils/userUtils'
import { MainActionable } from '../components'
import { addUserToFollowing } from '../redux/actions'
import { useHistory } from 'react-router-dom'

export const HomePage = () => {
  const tags = useSelector((state) => state.tags.tags)
  const history = useHistory()
  const { user: authenticatedUser, isAuthenticated } = useSelector((state) => state.auth)
  const [totalPages, setTotalPages] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const [blogs, setBlogs] = useState([])
  const [recommendedUsers, setRecommendedUsers] = useState([])
  const dispatch = useDispatch()
  const followUpdateUI = (userId) => {
    dispatch(addUserToFollowing(userId))
    setRecommendedUsers((prevRecommendedUsers) =>
      prevRecommendedUsers.map((user) => {
        if (user._id === userId) {
          return {
            ...user,
            followers: user.followers + 1
          }
        }
        return user
      })
    )
  }
  const unfollowUpdateUI = (userId) => {
    dispatch(addUserToFollowing(userId))
    setRecommendedUsers((prevRecommendedUsers) =>
      prevRecommendedUsers.map((user) => {
        if (user._id === userId) {
          return {
            ...user,
            followers: user.followers - 1
          }
        }
        return user
      })
    )
  }
  const followUser = async (userId) => {
    followUpdateUI(userId)
    const response = await fetch(`${API_BASE_URL}/user/follow/${userId}`, {
      method: 'POST',
      credentials: 'include'
    })
    const jsonResponse = await response.json()
    if (!jsonResponse.ok) {
      toast.error(jsonResponse?.message)
      unfollowUpdateUI(userId)
      return
    }
  }
  const unfollowUser = async (userId) => {
    unfollowUpdateUI(userId)
    const response = await fetch(`${API_BASE_URL}/user/unfollow/${userId}`, {
      method: 'POST',
      credentials: 'include'
    })
    const jsonResponse = await response.json()
    if (!jsonResponse.ok) {
      toast.error(jsonResponse?.message)
      followUpdateUI(userId)
      return
    }
  }
  useEffect(() => {
    const getBlogs = async () => {
      fetch(`${API_BASE_URL}/blogs?page=${currentPage}&limit=10`)
        .then((response) => response.json())
        .then((jsonResponse) => {
          if (!jsonResponse.ok) {
            toast.error(jsonResponse.message)
            return
          }
          setBlogs(jsonResponse.data)
          setTotalPages(jsonResponse.totalPages)
        })
    }
    getBlogs()
  }, [currentPage])
  useEffect(() => {
    const getRecommendedUsers = async () => {
      fetch(`${API_BASE_URL}/users/recommended?limit=5`)
        .then((response) => response.json())
        .then((jsonResponse) => {
          if (!jsonResponse.ok) {
            return
          }
          setRecommendedUsers(jsonResponse.data)
        })
    }
    getRecommendedUsers()
  }, [])
  return (
    <MainLayout className='home-page'>
      <aside className='public-blogs'>
        <section className='user-blogs mt-10'>
          {blogs.map((blog) => (
            <Blog key={blog._id} blog={blog} belongsToAuthenticatedUser={false} />
          ))}
        </section>
        {blogs.length === 0 ? (
          <p className='no-blogs'>
            There are no blogs to show yet
          </p>
        ) : (
          <div className='pagination'>
            <button onClick={() => setCurrentPage((prev) => prev - 1)} disabled={currentPage === 1}>
              Anterior
            </button>
            <span>
              Página {currentPage} de {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={currentPage === totalPages}
            >
              Siguiente
            </button>
          </div>
        )}
      </aside>
      <section>
        <div className='recommended-users mt-10'>
          {recommendedUsers
            .filter((user) => user._id !== authenticatedUser?._id)
            .map((user) => (
              <div key={user._id} className='recommended-user'>
                <div
                  className='recommended-user__data'
                  onClick={() => {
                    if (user?.alias == null) {
                      toast.error(`User ${user?.name} does not have an alias`)
                      return
                    }
                    history.push(`/user/${user?.alias}`)
                  }}
                >
                  <div className='user-name-bubble user-name-bubble--small'>
                    {getNameInitials(user?.name ?? '')}
                  </div>
                  <div>
                    <p className='view-blog-author'>{user?.name}</p>
                    {user?.email && <p className='user-description'>{user?.email}</p>}
                    {user?.email == null && user?.description && (
                      <p className='user-description'>{user?.description}</p>
                    )}
                  </div>
                </div>
                <MainActionable
                  style={MAIN_ACTIONABLE_STYLES.OUTLINE}
                  onClick={() => {
                    if (!isAuthenticated) {
                      toast.error('You need to be logged in to follow a user')
                      return
                    }
                    if (isFollowing(authenticatedUser, user._id)) {
                      unfollowUser(user._id)
                      return
                    }
                    followUser(user._id)
                  }}
                >
                  {isFollowing(authenticatedUser, user._id) ? 'Unfollow' : 'Follow'}
                </MainActionable>
              </div>
            ))}
        </div>
        {tags && tags?.length > 0 && (
          <h2 className='recommended-users-title mt-10 mb-4'>Recommended topics</h2>
        )}
        <div className='view-blog-tags mb-10'>
          {tags && tags?.map((tag) => <span key={tag._id}>{tag.title}</span>)}
        </div>
      </section>
    </MainLayout>
  )
}
