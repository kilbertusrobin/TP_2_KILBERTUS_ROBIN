const mongoose = require("mongoose");
const User = require("../models/userModel");

// GET /api/users?role=admin&search=ali&page=1&limit=2
async function getAllUsers(req, res, next) {
  try {
    const { role, search, page = 1, limit } = req.query;

    const filter = {};
    if (role)   filter.role = role;
    if (search) filter.name = new RegExp(search, "i");

    // Pagination (active seulement si ?limit est fourni)
    if (limit) {
      const pageNum  = Math.max(1, parseInt(page));
      const limitNum = Math.max(1, parseInt(limit));
      const skip     = (pageNum - 1) * limitNum;
      const totalCount = await User.countDocuments(filter);
      const totalPages = Math.ceil(totalCount / limitNum);
      const data = await User.find(filter).skip(skip).limit(limitNum);
      return res.status(200).json({ success: true, page: pageNum, limit: limitNum, totalCount, totalPages, data });
    }

    const data = await User.find(filter);
    res.status(200).json({ success: true, count: data.length, data });
  } catch (err) {
    next(err);
  }
}

// GET /api/users/:id
async function getUserById(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ success: false, message: "ID invalide" });
    }
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "Utilisateur non trouvé" });
    }
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
}

// POST /api/users
async function createUser(req, res, next) {
  try {
    const { name, email, role } = req.body;
    if (!name || !email) {
      return res.status(400).json({ success: false, message: "Les champs name et email sont obligatoires" });
    }
    const user = await User.create({ name, email, role });
    res.status(201).json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
}

// PUT /api/users/:id
async function updateUser(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ success: false, message: "ID invalide" });
    }
    const { _id, createdAt, ...allowedUpdates } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, allowedUpdates, { new: true, runValidators: true });
    if (!user) {
      return res.status(404).json({ success: false, message: "Utilisateur non trouvé" });
    }
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
}

// DELETE /api/users/:id
async function deleteUser(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ success: false, message: "ID invalide" });
    }
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "Utilisateur non trouvé" });
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser };
