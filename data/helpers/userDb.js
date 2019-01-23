const db = require("../config/dbConfig");

module.exports = {
  register: function(user) {
    return db("users").insert(user);
  },

  getUserByName: function (username) {
    return db("users").where("username", username);
  },

  getUsers: function () {
    return db("users");
  }
};
