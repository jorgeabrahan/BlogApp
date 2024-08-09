export const isFollowing = (authenticatedUser, publicUserId) => {
  return authenticatedUser?.following?.includes(publicUserId)
}
