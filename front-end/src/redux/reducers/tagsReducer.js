const initialState = {
  tags: []
};

const tagsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_TAGS':
      return {
        ...state,
        tags: action.payload
      };
    case 'ADD_TAG':
      return {
        ...state,
        tags: [...state.tags, action.payload]
      };
    default:
      return state;
  }
};

export default tagsReducer;
