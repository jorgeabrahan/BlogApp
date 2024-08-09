const User = require('../models/User')

exports.getAuthenticatedUser = (req, res) => {
  res.status(200).json({ user: req.user, isAuthenticated: req.isAuthenticated() })
}

exports.getUserByAlias = async (req, res) => {
  const { alias } = req.params;

  try {
    const user = await User.findOne({ alias: alias.toLowerCase() });

    if (!user) {
      return res.status(404).json({ ok: false, message: 'User not found' });
    }

    res.status(200).json({
      ok: true,
      data: user
    });
  } catch (err) {
    res.status(500).json({ ok: false, message: 'Error retrieving user', debugError: err });
  }
};

exports.updateProfile = async (req, res) => {
  const { name, email, description, alias } = req.body
  const userId = req.user._id

  try {
    if (alias) {
      const existingUser = await User.findOne({ alias: alias });
      if (existingUser && existingUser._id.toString() !== userId.toString()) {
        return res.status(400).json({ ok: false, message: `The alias ${alias} is already in use` });
      }
    }
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          name: name || req.user.name,
          email: email || req.user.email,
          description: description || req.user.description,
          alias: alias || req.user.alias,
        }
      },
      { new: true }
    )

    res.status(200).json({
      ok: true,
      data: updatedUser
    })
  } catch (err) {
    res.status(500).json({ ok: false, message: 'Error updating profile', debugError: err })
  }
}

exports.followUser = async (req, res) => {
  const userIdToFollow = req.params.userId
  const userId = req.user._id

  if (userIdToFollow === userId.toString()) {
    return res.status(400).json({ ok: false, message: "You cannot follow yourself" });
  }

  try {
    // increment followers
    const userToFollow = await User.findByIdAndUpdate(
      userIdToFollow,
      { $inc: { followers: 1 } },
      { new: true }
    )

    if (!userToFollow) {
      return res.status(404).json({ ok: false, message: 'User not found' })
    }

    // add user to following array from the authenticated user
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { following: userIdToFollow } },
      { new: true }
    )

    res.status(200).json({
      ok: true,
      data: updatedUser
    })
  } catch (err) {
    res.status(500).json({ ok: false, message: 'Error following user', debugError: err })
  }
}

exports.unfollowUser = async (req, res) => {
  const userIdToUnfollow = req.params.userId;
  const userId = req.user._id;

  if (userIdToUnfollow === userId.toString()) {
    return res.status(400).json({ ok: false, message: "You cannot unfollow yourself" });
  }

  try {
    // decrement followers
    const userToUnfollow = await User.findByIdAndUpdate(
      userIdToUnfollow,
      { $inc: { followers: -1 } },
      { new: true }
    );

    if (!userToUnfollow) {
      return res.status(404).json({ ok: false, message: 'User not found' });
    }

    // remove user from following array from the authenticated user
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { following: userIdToUnfollow } },
      { new: true }
    );

    res.status(200).json({
      ok: true,
      data: updatedUser
    });
  } catch (err) {
    res.status(500).json({ ok: false, message: 'Error unfollowing user', debugError: err });
  }
};
