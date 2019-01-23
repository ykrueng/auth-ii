const db = require("../config/dbConfig");

module.exports = {
  register: function(user) {
    return db("users").insert(user);
  },

  getUserByName: function (username) {
    return db("users").where("username", username).first();
  },

  getUserById: function (id) {
    return db("users").where("id", id).first();
  },

  getUsers: function (department) {
    const query = db("users");

    if (department) {
      query.where('department', department);
    }

    return query;
  }
};
