const mongoose = require('mongoose')

const tagSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Tag', tagSchema)
