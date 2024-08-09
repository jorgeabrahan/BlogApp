import React from 'react'
import { useSelector } from 'react-redux'

export const BlogTagsInput = ({ id = '', onCreateTag = () => {}, ...props }) => {
  const tags = useSelector((state) => state.tags.tags)
  return (
    <>
      <div className='input-blog-tags mb-5'>
        <input list='blog-tags' name={id} id={id} autoComplete='off' {...props} />
        <button type='button' onClick={onCreateTag}>Add Tag</button>
      </div>

      <datalist id='blog-tags'>
        {tags.map((tag) => (
          <option key={tag._id} value={tag.title} />
        ))}
      </datalist>
    </>
  )
}
