const User = require('../models/User');

exports.getUsersWithLimit = async (req, res) => {
  const limit = parseInt(req.query.limit) || 5;
  const userId = req?.user?._id;

  try {
    let query = {};
    if (userId) {
      query._id = { $ne: userId }; // Excluir al usuario autenticado
    }

    const users = await User.find(query)
      .limit(limit)
      .exec();

    if (!users.length) {
      return res.status(404).json({ ok: false, message: 'No users found' });
    }

    res.status(200).json({
      ok: true,
      data: users
    });
  } catch (err) {
    res.status(500).json({ ok: false, message: 'Error retrieving users', debugError: err });
  }
};
