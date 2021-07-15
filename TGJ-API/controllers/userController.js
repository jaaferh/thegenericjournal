const Author = require('../models/author');
const User = require('../models/user');

// REGISTER USER
exports.register_user = async (req, res, next) => {
  try {
    const author = new Author({
      first_name: req.body.first_name,
      family_name: req.body.family_name,
    });

    const createdAuthor = await author.save();

    const user = new User({
      email: req.body.email,
      author: createdAuthor,
    });
    user.password = await user.hashPassword(req.body.password);
    const createdUser = await user.save();

    return res.send(createdUser);
  } catch (err) {
    return next(err);
  }
};

// LOGIN USER
exports.login_user = async (req, res, next) => {
  const login = {
    email: req.body.email,
    password: req.body.password,
  };

  try {
    // Get user from email
    const user = await User.findOne({
      email: login.email,
    });

    // Check if user exists
    if (!user) {
      return next('Email not found');
    }
    const match = await user.compareUserPassword(login.password, user.password);
    if (match) {
      const token = await user.generateJwtToken({
        user,
      }, 'secret', {
        expiresIn: 120,
      });
      if (token) {
        return res.send({ token, user });
      }
    }

    // If all fails
    return res.status(400);
  } catch (err) {
    return next(err);
  }
};
