const users = require('./users-db.json');
const servey = require('./servey-db.json');

module.exports = () => ({
  users: users,
  servey: servey
});