const { prisma } = require("./prisma");
const bcrypt = require("bcryptjs");

// returns user based on given database unique id from session
async function getUserForDeserialize(id) {
  const user = await prisma.User.findUnique({
    where: { id: id },
  });

  return user;
}

async function getUser(username) {}

async function insertUser(username, password) {
  const hashedPass = await bcrypt.hash(password, 15);

  await prisma.User.create({
    data: {
      username: username,
      password: hashedPass,
    },
  });

  return console.log("User inserted into database table.");
}

module.exports = { getUser, getUserForDeserialize, insertUser };
