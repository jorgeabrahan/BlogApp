import React, { useEffect, useState } from 'react'
import { MainLayout } from '../layouts'
import { useParams, useHistory } from 'react-router-dom'
import { API_BASE_URL } from '../lib/utils/constants'
import { UserBlogs, UserDetails } from '../components/pages/profile'
import { toast } from 'react-toastify'

export const PublicUserPage = () => {
  const { alias } = useParams()
  const [publicUserInfo, setPublicUserInfo] = useState({})
  const [publicUserBlogs, setPublicUserBlogs] = useState([])
  const history = useHistory()
  useEffect(() => {
    const getUserByAlias = async () => {
      const response = await fetch(`${API_BASE_URL}/user/${alias}`)
      const jsonResponse = await response.json()
      if (!jsonResponse.ok) {
        toast.error(jsonResponse?.message)
        history.push('/')
        return
      }
      setPublicUserInfo(jsonResponse.data)
    }
    getUserByAlias()
  }, [alias, history])
  useEffect(() => {
    if (publicUserInfo._id == null) return
    const getUserBlogs = async () => {
      const response = await fetch(`${API_BASE_URL}/blogs/user/${publicUserInfo._id}`)
      const jsonResponse = await response.json()
      if (!jsonResponse.ok) {
        toast.error(jsonResponse?.message)
        return
      }
      setPublicUserBlogs(jsonResponse.data)
    }
    getUserBlogs()
  }, [publicUserInfo])

  return (
    <MainLayout>
      <section className='profile-page'>
        <UserDetails
          publicUserInfo={publicUserInfo}
          setPublicUserInfo={setPublicUserInfo}
          showPublicUserInfo
        />
        <UserBlogs publicUserBlogs={publicUserBlogs} showPublicUserBlogs />
      </section>
    </MainLayout>
  )
}
