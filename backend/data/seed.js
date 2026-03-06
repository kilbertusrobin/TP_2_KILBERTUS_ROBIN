require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/userModel");

const initialUsers = [
  { name: "Alice Martin",   email: "alice@example.com", role: "admin", createdAt: new Date("2024-01-15") },
  { name: "Bob Dupont",     email: "bob@example.com",   role: "user",  createdAt: new Date("2024-03-22") },
  { name: "Clara Lefebvre", email: "clara@example.com", role: "user",  createdAt: new Date("2024-06-10") },
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  await User.deleteMany({});
  const inserted = await User.insertMany(initialUsers);
  console.log(`${inserted.length} utilisateurs insérés :`);
  inserted.forEach((u) => console.log(` - ${u.name} (${u._id})`));
  await mongoose.disconnect();
}

seed().catch((err) => { console.error(err); process.exit(1); });
