import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UserNumericData } from './userDetails/'
import { getNameInitials, isFollowing } from '../../../lib/utils/userUtils'
import { UpdateUserProfileModal } from '../../../modals'
import { ShareIcon } from '../../../icons'
import { MainActionable } from '../../actionables/MainActionable'
import { API_BASE_URL, MAIN_ACTIONABLE_STYLES } from '../../../lib/utils/constants'
import { toast } from 'react-toastify'
import { addUserToFollowing, removeUserFromFollowing } from '../../../redux/actions'

export const UserDetails = ({
  publicUserInfo,
  setPublicUserInfo = () => {},
  showPublicUserInfo = false
}) => {
  const dispatch = useDispatch()
  const { user, isAuthenticated } = useSelector((state) => state.auth)
  const userToRender = showPublicUserInfo ? publicUserInfo : user
  const [showUpdateUserProfileModal, setShowUpdateUserProfileModal] = useState(false)
  const copyUserLinkToClipboard = () => {
    if (userToRender.alias == null) {
      toast.error('Set an alias to share your profile')
      return
    }
    navigator.clipboard.writeText(`${window.location.origin}/user/${userToRender?.alias}`)
    toast.success('User link copied to clipboard')
  }
  const followUpdateUI = () => {
    setPublicUserInfo(prevPublicUserInfo => ({
      ...prevPublicUserInfo,
      followers: prevPublicUserInfo.followers + 1
    }))
    dispatch(addUserToFollowing(publicUserInfo._id))
  }
  const unfollowUpdateUI = () => {
    setPublicUserInfo(prevPublicUserInfo => ({
      ...prevPublicUserInfo,
      followers: prevPublicUserInfo.followers - 1
    }))
    dispatch(removeUserFromFollowing(publicUserInfo._id))
  }
  const followPublicUser = async () => {
    followUpdateUI()
    const response = await fetch(`${API_BASE_URL}/user/follow/${publicUserInfo._id}`, {
      method: 'POST',
      credentials: 'include'
    })
    const jsonResponse = await response.json()
    if (!jsonResponse.ok) {
      toast.error(jsonResponse?.message)
      unfollowUpdateUI()
      return
    }
  }
  const unfollowPublicUser = async () => {
    unfollowUpdateUI()
    const response = await fetch(`${API_BASE_URL}/user/unfollow/${publicUserInfo._id}`, {
      method: 'POST',
      credentials: 'include'
    })
    const jsonResponse = await response.json()
    if (!jsonResponse.ok) {
      toast.error(jsonResponse?.message)
      followUpdateUI()
      return
    }
  }
  return (
    <>
      <aside className='user-details'>
        <header className='user__header'>
          <div className='user-name-bubble user-name-bubble--bigger'>
            {getNameInitials(userToRender?.name ?? '')}
          </div>
          <section className='user__stats'>
            <UserNumericData
              value={userToRender?.followers}
              label={`follower${userToRender?.followers !== 1 ? 's' : ''}`}
            />
            <UserNumericData value={userToRender?.following?.length} label='following' />
          </section>
        </header>
        <div className='user-name-container'>
          <p className='user__primary'>{userToRender?.name}</p>
          <MainActionable
            style={MAIN_ACTIONABLE_STYLES.OUTLINE}
            isRound
            onClick={copyUserLinkToClipboard}
          >
            <ShareIcon size='16px' />
          </MainActionable>
        </div>
        {userToRender?.email && <p className='user__secondary'>{userToRender?.email}</p>}

        {userToRender?.description && (
          <p className='user__description'>{userToRender?.description}</p>
        )}
        {!showPublicUserInfo && (
          <button className='link mt-4' onClick={() => setShowUpdateUserProfileModal(true)}>
            Edit profile
          </button>
        )}
        {showPublicUserInfo && isAuthenticated && user?._id !== publicUserInfo?._id && (
          <MainActionable className='mt-3' style={MAIN_ACTIONABLE_STYLES.FLAT} onClick={() => {
            isFollowing(user, publicUserInfo._id) ? unfollowPublicUser() : followPublicUser()
          }}>
            {isFollowing(user, publicUserInfo._id) ? 'Unfollow' : 'Follow'}
          </MainActionable>
        )}
      </aside>
      <UpdateUserProfileModal
        isOpen={showUpdateUserProfileModal}
        setIsOpen={setShowUpdateUserProfileModal}
      />
    </>
  )
}
