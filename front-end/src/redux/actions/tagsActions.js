export const setTags = (tags) => ({
  type: 'SET_TAGS',
  payload: tags,
});

export const addTag = (tag) => ({
  type: 'ADD_TAG',
  payload: tag,
});
