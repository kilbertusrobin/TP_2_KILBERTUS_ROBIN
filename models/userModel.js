const users = require("../data/users");

function getAll(role) {
  return role ? users.filter((u) => u.role === role) : users;
}

function getById(id) {
  return users.find((u) => u.id === id) || null;
}

function isEmailTaken(email, excludeId = null) {
  return users.some((u) => u.email === email && u.id !== excludeId);
}

function create(data) {
  const newUser = {
    id: users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1,
    name: data.name,
    email: data.email,
    role: data.role || "user",
    createdAt: new Date().toISOString().split("T")[0],
  };
  users.push(newUser);
  return newUser;
}

function update(id, data) {
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) return null;
  const { id: _id, createdAt, ...allowedUpdates } = data;
  users[index] = { ...users[index], ...allowedUpdates };
  return users[index];
}

function remove(id) {
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) return false;
  users.splice(index, 1);
  return true;
}

module.exports = { getAll, getById, isEmailTaken, create, update, remove };
