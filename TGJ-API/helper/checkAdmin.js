const Role = require('../models/role');

module.exports = async function hasAdminAccess(request) {
  let isAdmin = false;
  const { user } = request.headers;
  if (user) {
    const userObj = JSON.parse(user);
    const userRole = await Role.findById(userObj.role);
    if (userRole) {
      if (userRole.name === 'Admin' || userRole.name === 'Owner') {
        isAdmin = true;
      }
    }
  }

  return isAdmin;
};
