import React from 'react'
import { MainLayout } from '../layouts'
import { UserDetails } from '../components/pages/profile'
import { UserBlogs } from '../components/pages/profile/UserBlogs'

export const ProfilePage = () => {
  return (
    <MainLayout>
      <section className='profile-page'>
        <UserDetails />
        <UserBlogs />
      </section>
    </MainLayout>
  )
}
