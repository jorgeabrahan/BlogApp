import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { MainLayout } from '../layouts'
import {
  BlogContentArea,
  BlogTagsInput,
  BlogTextArea,
  BlogTitleInput,
  MainActionable
} from '../components'
import { toast } from 'react-toastify'
import { API_BASE_URL, MAIN_ACTIONABLE_STYLES } from '../lib/utils/constants'
import { addBlog, addTag, updateBlog } from '../redux/actions'
import { XmarkIcon } from '../icons'

class WriteBlog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      briefDescription: '',
      content: '',
      tag: '',
      currentBlogTags: [],
      isEditing: false,
      blogId: null
    }
  }

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const blogToEdit = query.get('blogToEdit');
    if (blogToEdit) {
      this.fetchBlogToEdit(blogToEdit);
    }
  }

  fetchBlogToEdit = (blogId) => {
    const { history } = this.props

    fetch(`${API_BASE_URL}/blogs/${blogId}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((jsonResponse) => {
        if (!jsonResponse.ok) {
          toast.error(jsonResponse.message);
          return;
        }
        const blog = jsonResponse.data;
        if (blog.author._id !== this.props.user._id) {
          toast.error('You are not authorized to edit this blog');
          history.push('/');
          return;
        }
        this.setState({
          title: blog.title,
          briefDescription: blog.briefDescription,
          content: blog.content,
          currentBlogTags: blog.tags,
          isEditing: true,
          blogId: blog._id
        });
      });
  };

  onInputChange = (e) => {
    this.setState({ [e.target.id]: e.target.value })
  }

  clearInput = (inputName) => {
    this.setState({ [inputName]: '' })
  }

  onCreateTag = () => {
    const { tag, currentBlogTags } = this.state
    const { tags, dispatch } = this.props

    if (tag.length === 0) {
      toast.error('Please add a tag')
      return
    }
    if (tag.includes(' ')) {
      toast.error('Tag cannot contain spaces')
      return
    }
    const regex = /^[a-zA-Z0-9-]+$/
    if (!regex.test(tag)) {
      toast.error('Tag can only contain letters, hyphens and numbers')
      return
    }
    const formattedTag = tag.toLowerCase()
    if (currentBlogTags.some((t) => t.title === formattedTag)) {
      toast.error('Tag is already added')
      this.clearInput('tag')
      return
    }
    if (tags.some((t) => t.title === formattedTag)) {
      this.setState({
        currentBlogTags: [...currentBlogTags, tags.find((t) => t.title === formattedTag)]
      })
      this.clearInput('tag')
      return
    }
    fetch(`${API_BASE_URL}/tags`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title: formattedTag })
    })
      .then((response) => response.json())
      .then((jsonResponse) => {
        if (!jsonResponse.ok) {
          toast.error(jsonResponse.message)
          return
        }
        this.setState({
          currentBlogTags: [...currentBlogTags, jsonResponse.data]
        })
        dispatch(addTag(jsonResponse.data))
        toast.success('Tag created successfully')
        this.clearInput('tag')
      })
  }

  removeTagFromCurrentBlogTags = (tag) => {
    this.setState((prevState) => ({
      currentBlogTags: prevState.currentBlogTags.filter((currentTag) => currentTag._id !== tag._id)
    }))
  }

  onSavePost = (e) => {
    e.preventDefault()
    const { title, briefDescription, content, currentBlogTags, isEditing, blogId } = this.state;
    const { dispatch, history, user } = this.props;

    if (title.length === 0) {
      toast.error('Please add a title')
      return
    }
    if (title.length > 50) {
      toast.error('Title cannot be longer than 50 characters')
      return
    }
    if (briefDescription.length === 0) {
      toast.error('Please add a brief description')
      return
    }
    if (briefDescription.length > 200) {
      toast.error('Brief description cannot be longer than 200 characters')
      return
    }
    if (content.length === 0) {
      toast.error('Please add content')
      return
    }
    if (currentBlogTags.length === 0) {
      toast.error('Please add at least one tag')
      return
    }
    const formattedTags = currentBlogTags.map((tag) => tag?._id)
    const blogData = {
      title,
      briefDescription,
      content,
      tags: formattedTags
    };
    if (isEditing) {
      fetch(`${API_BASE_URL}/blogs/${blogId}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(blogData)
      })
        .then((response) => response.json())
        .then((jsonResponse) => {
          if (!jsonResponse.ok) {
            toast.error(jsonResponse.message);
            return;
          }
          toast.success('Blog updated successfully');
          dispatch(updateBlog(jsonResponse.data));
          history.push('/profile');
        });
    } else {
      fetch(`${API_BASE_URL}/blogs`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(blogData)
      })
        .then((response) => response.json())
        .then((jsonResponse) => {
          if (!jsonResponse.ok) {
            toast.error(jsonResponse.message);
            return;
          }
          toast.success('Blog created successfully');
          dispatch(addBlog({
            ...jsonResponse.data,
            author: user,
            tags: currentBlogTags
          }));
          this.setState({
            title: '',
            briefDescription: '',
            content: '',
            tag: '',
            currentBlogTags: [],
            isEditing: false,
            blogId: null
          });
          history.push('/profile');
        });
    }
  }

  render() {
    const { title, briefDescription, content, tag, currentBlogTags, isEditing } = this.state;
    return (
      <MainLayout>
        <form>
          <BlogTitleInput id='title' value={title} onChange={this.onInputChange} required />
          <BlogTextArea
            id='briefDescription'
            className='font-serif mb-5'
            value={briefDescription}
            onChange={this.onInputChange}
            required
          />
          <BlogContentArea
            id='content'
            placeholder='Write your blog post...'
            className='mb-5'
            value={content}
            onChange={this.onInputChange}
            required
          />
          <BlogTagsInput
            id='tag'
            onCreateTag={this.onCreateTag}
            value={tag}
            onChange={this.onInputChange}
          />
          <section className='tags-wrapper mb-10'>
            {currentBlogTags.map((tag) => (
              <div key={tag._id} className='tag-wrapper'>
                <span className='tag-text'>{tag.title}</span>
                <button
                  className='tag-close-button'
                  onClick={() => this.removeTagFromCurrentBlogTags(tag)}
                  type='button'
                >
                  <XmarkIcon size='14px' />
                </button>
              </div>
            ))}
          </section>
          <MainActionable
            className='ml-auto mb-20'
            style={MAIN_ACTIONABLE_STYLES.OUTLINE}
            onClick={this.onSavePost}
          >
            {isEditing ? 'Update' : 'Publish'}
          </MainActionable>
        </form>
      </MainLayout>
    )
  }
}

const mapStateToProps = (state) => ({
  tags: state.tags.tags,
  user: state.auth.user
})

export const WriteBlogPage = connect(mapStateToProps)(withRouter(WriteBlog))
