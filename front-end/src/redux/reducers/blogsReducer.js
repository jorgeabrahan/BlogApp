const initialState = {
  blogs: []
};

const blogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_BLOGS':
      return {
        ...state,
        blogs: action.payload
      };
    case 'ADD_BLOG':
      return {
        ...state,
        blogs: [...state.blogs, action.payload]
      };
    case 'UPDATE_BLOG':
      return {
        ...state,
        blogs: state.blogs.map(blog =>
          blog._id === action.payload._id ? action.payload : blog
        )
      };
    case 'DELETE_BLOG':
      return {
        ...state,
        blogs: state.blogs.filter(blog => blog._id !== action.payload)
      };
    default:
      return state;
  }
};

export default blogsReducer;
