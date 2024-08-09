const initialState = {
  user: null,
  isAuthenticated: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    case 'ADD_USER_TO_FOLLOWING':
      return {
        ...state,
        user: {
          ...state.user,
          following: [...state.user.following, action.payload]
        }
      };
    case 'REMOVE_USER_FROM_FOLLOWING':
      return {
        ...state,
        user: {
          ...state.user,
          following: state.user.following.filter(userId => userId !== action.payload)
        }
      };
    default:
      return state;
  }
};

export default authReducer;
