const Role = require('../models/role');
const Post = require('../models/post');

// middleware for doing role-based permissions
module.exports = function permit(...permittedRoles) {
  return async (req, res, next) => {
    const { user } = req.headers;

    if (!user) return next();

    const userObj = JSON.parse(user);
    const userRole = await Role.findById(userObj.role);

    if (userRole && permittedRoles.includes(userRole.name)) {
      // Users and Admins must have matching author ids with the requested author/post
      if ((userRole.name === 'User' || userRole.name === 'Admin') && req.params.id) {
        // Author id check
        if (userObj.author._id === req.params.id) {
          return next();
        }
        // Post Author id check
        const post = await Post.findById(req.params.id);
        if (post) {
          if (String(post.author) === String(userObj.author._id)) {
            return next();
          }
        }

        return res.status(403).json({ message: 'Forbidden' }).end();
      }
      return next();
    }
    return res.status(403).json({ message: 'Forbidden' }).end();
  };
};
