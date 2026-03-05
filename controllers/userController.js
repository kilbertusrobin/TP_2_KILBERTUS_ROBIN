const UserModel = require("../models/userModel");

function getAllUsers(req, res) {
  const result = UserModel.getAll(req.query.role);
  res.status(200).json({ success: true, count: result.length, data: result });
}

function getUserById(req, res) {
  const user = UserModel.getById(parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ success: false, message: "Utilisateur non trouvé" });
  }
  res.status(200).json({ success: true, data: user });
}

function createUser(req, res) {
  const { name, email, role } = req.body;
  if (!name || !email) {
    return res.status(400).json({ success: false, message: "Les champs name et email sont obligatoires" });
  }
  if (UserModel.isEmailTaken(email)) {
    return res.status(409).json({ success: false, message: "Cet email est déjà utilisé" });
  }
  const newUser = UserModel.create({ name, email, role });
  res.status(201).json({ success: true, data: newUser });
}

function updateUser(req, res) {
  const id = parseInt(req.params.id);
  if (!UserModel.getById(id)) {
    return res.status(404).json({ success: false, message: "Utilisateur non trouvé" });
  }
  const { email } = req.body;
  if (email && UserModel.isEmailTaken(email, id)) {
    return res.status(409).json({ success: false, message: "Cet email est déjà utilisé" });
  }
  const updated = UserModel.update(id, req.body);
  res.status(200).json({ success: true, data: updated });
}

function deleteUser(req, res) {
  const deleted = UserModel.remove(parseInt(req.params.id));
  if (!deleted) {
    return res.status(404).json({ success: false, message: "Utilisateur non trouvé" });
  }
  res.status(204).send();
}

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser };
