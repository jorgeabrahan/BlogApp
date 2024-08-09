const Tag = require('../models/Tag');

exports.getAllTags = async (req, res) => {
  try {
    const tags = await Tag.find({});
    res.status(200).json({
      ok: true,
      data: tags
    });
  } catch (err) {
    res.status(500).json({ ok: false, message: 'Error retrieving tags', debugError: err });
  }
};

exports.createTag = async (req, res) => {
  const { title } = req.body;

  try {
    const newTag = new Tag({ title: title.toLowerCase() });
    await newTag.save();
    res.status(201).json({
      ok: true,
      data: newTag
    });
  } catch (err) {
    if (err.code === 11000) { // in case of duplicate key error
      res.status(400).json({ ok: false, message: 'Tag already exists' });
    } else {
      res.status(500).json({ ok: false, message: 'Error creating tag', debugError: err });
    }
  }
};
