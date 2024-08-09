import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setBlogs, setTags, setUser } from '../redux/actions'
import { API_BASE_URL } from '../lib/utils/constants'

export const SessionProvider = ({ children }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    const getBlogsTags = async () => {
      fetch(`${API_BASE_URL}/tags`)
        .then((response) => response.json())
        .then((jsonResponse) => {
          if (!jsonResponse.ok) return
          dispatch(setTags(jsonResponse.data))
        })
    }
    const getUserBlogs = async () => {
      fetch(`${API_BASE_URL}/blogs/user`, {
        credentials: 'include'
      })
        .then((response) => response.json())
        .then((jsonResponse) => {
          if (!jsonResponse.ok) return
          dispatch(setBlogs(jsonResponse.data))
        })
    }
    const restoreUserSession = async () => {
      fetch(`${API_BASE_URL}/user`, {
        credentials: 'include'
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.isAuthenticated) {
            dispatch(setUser(data.user))
            getUserBlogs()
          }
        })
    }
    restoreUserSession()
    getBlogsTags()
  }, [dispatch])
  return <>{children}</>
}
