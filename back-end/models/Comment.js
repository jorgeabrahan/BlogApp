const mongoose = require('mongoose')

const ReplySchema = new mongoose.Schema(
  {
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    description: { type: String, required: true },
    likes: { type: Number, default: 0 }
  },
  { timestamps: true }
)

const CommentSchema = new mongoose.Schema(
  {
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    description: { type: String, required: true },
    likes: { type: Number, default: 0 },
    replies: [ReplySchema]
  },
  { timestamps: true }
)

module.exports = mongoose.model('Comment', CommentSchema)
