export const setUser = (user) => ({
  type: 'SET_USER',
  payload: user,
});

export const logout = () => ({
  type: 'LOGOUT',
});

export const addUserToFollowing = (userId) => ({
  type: 'ADD_USER_TO_FOLLOWING',
  payload: userId,
});

export const removeUserFromFollowing = (userId) => ({
  type: 'REMOVE_USER_FROM_FOLLOWING',
  payload: userId,
});
