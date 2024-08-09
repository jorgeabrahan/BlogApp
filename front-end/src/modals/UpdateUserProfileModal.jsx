import React from 'react'
import { ModalLayout } from '../layouts'
import { Input, MainActionable, TextArea } from '../components/'
import { API_BASE_URL, MAIN_ACTIONABLE_STYLES } from '../lib/utils/constants'
import { useForm } from '../hooks'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { setUser } from '../redux/actions'

export const UpdateUserProfileModal = ({ isOpen = false, setIsOpen = () => {} }) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user)
  const { name, email, alias, description, onInputChange } = useForm({
    name: user?.name ?? '',
    email: user?.email ?? '',
    alias: user?.alias ?? '',
    description: user?.description ?? ''
  })
  const handleUpdateProfileSubmit = async (e) => {
    e.preventDefault()
    if (name.length === 0 || email.length === 0) {
      toast.error('Name and email are required')
      return
    }
    const maxDescriptionLength = 400
    if (description.length > maxDescriptionLength) {
      toast.error(`Description can't be longer than ${maxDescriptionLength} characters`)
      return
    }
    const sanitizedAlias = alias.toLowerCase().replace(/\s+/g, '')
    if (sanitizedAlias !== alias.toLowerCase()) {
      toast.error("The alias can't contain spaces")
      return
    }
    const userData = {
      name,
      email,
      description,
      alias: sanitizedAlias
    }

    try {
      const response = await fetch(`${API_BASE_URL}/user/profile`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      })

      const jsonResponse = await response.json()
      if (!jsonResponse.ok) {
        return toast.error(jsonResponse?.message)
      }

      toast.success('Profile updated successfully')
      dispatch(setUser(jsonResponse.data))
      setIsOpen(false)
    } catch (error) {
      toast.error('Error communicating with the server')
    }
  }
  return (
    <ModalLayout isOpen={isOpen} setIsOpen={setIsOpen}>
      <h2 className='modal__title'>Update Profile</h2>
      <form className='update-profile-form' onSubmit={handleUpdateProfileSubmit}>
        <section className='update-profile-form__inputs'>
          <Input
            id='name'
            label='Name'
            autoComplete='off'
            value={name}
            onChange={onInputChange}
            required
          />
          <Input
            type='email'
            id='email'
            label='Email'
            autoComplete='off'
            value={email}
            onChange={onInputChange}
            required
          />
          <Input
            id='alias'
            label='Alias'
            autoComplete='off'
            value={alias}
            onChange={onInputChange}
          />
          <TextArea
            id='description'
            label='Description'
            value={description}
            onChange={onInputChange}
          />
        </section>
        <MainActionable style={MAIN_ACTIONABLE_STYLES.FLAT} type='submit'>
          Save
        </MainActionable>
      </form>
    </ModalLayout>
  )
}
