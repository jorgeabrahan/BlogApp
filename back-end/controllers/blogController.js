const Blog = require('../models/Blog');

exports.createBlog = async (req, res) => {
  const { title, content, briefDescription, tags } = req.body;
  const author = req.user._id;

  try {
    const newBlog = new Blog({
      title,
      content,
      briefDescription,
      author,
      tags
    });
    await newBlog.save();
    res.status(201).json({ ok: true, data: newBlog });
  } catch (err) {
    res.status(500).json({ ok: false, message: 'Error creating blog', debugError: err });
  }
};


exports.updateBlog = async (req, res) => {
  const { id } = req.params;
  const { title, content, briefDescription, tags } = req.body;

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { title, content, briefDescription, tags },
      { new: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ ok: false, message: 'Blog not found' });
    }

    res.status(200).json({ ok: true, data: updatedBlog });
  } catch (err) {
    res.status(500).json({ ok: false, message: 'Error updating blog', debugError: err });
  }
};

exports.deleteBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      return res.status(404).json({ ok: false, message: 'Blog not found' });
    }

    res.status(200).json({ ok: true, message: 'Blog deleted successfully' });
  } catch (err) {
    res.status(500).json({ ok: false, message: 'Error deleting blog', debugError: err });
  }
};

exports.getBlogById = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await Blog.findById(id).populate('author tags');

    if (!blog) {
      return res.status(404).json({ ok: false, message: 'Blog not found' });
    }

    res.status(200).json({ ok: true, data: blog });
  } catch (err) {
    res.status(500).json({ ok: false, message: 'Error retrieving blog', debugError: err });
  }
};

exports.getBlogsByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const blogs = await Blog.find({ author: userId }).populate('author tags');
    res.status(200).json({ ok: true, data: blogs });
  } catch (err) {
    res.status(500).json({ ok: false, message: 'Error retrieving blogs', debugError: err });
  }
};

exports.getBlogsByAuthenticatedUser = async (req, res) => {
  const userId = req.user._id;

  try {
    const blogs = await Blog.find({ author: userId }).populate('author tags');
    res.status(200).json({ ok: true, data: blogs });
  } catch (err) {
    res.status(500).json({ ok: false, message: 'Error retrieving blogs', debugError: err });
  }
};

exports.getAllBlogs = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const blogs = await Blog.find()
      .populate('author tags')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Blog.countDocuments();

    res.status(200).json({
      ok: true,
      data: blogs,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (err) {
    res.status(500).json({ ok: false, message: 'Error retrieving blogs', debugError: err });
  }
};
