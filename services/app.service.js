const App = require("../models/App");

function appService() {

  //Get Apps by RoleId, return an array of apps(objects)
  async function getAppsByRoleId(roleId) {
    const query = { _roles: roleId };
    return App.find(query, { _id: 0, _roles: 0, "features._id": 0 });
  }

  return {
    getAppsByRoleId
  };
}

module.exports = appService;
