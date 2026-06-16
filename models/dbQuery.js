const { prisma } = require("./prisma");
const bcrypt = require("bcryptjs");

// returns user based on given database unique id from session
async function getUserForDeserialize(searchId) {

    const intId = Number(searchId);
    
  const user = await prisma.user.findUnique({
    where: { 
        id: searchId
    },
  });

  return user;
}

// returns the user based on their unique username
async function getUser(username) {
  const user = await prisma.user.findFirst({
    where: {
      username: {
        equals: username,
      },
    },
  });

  return user;
}

async function insertUser(username, password) {
  const hashedPass = await bcrypt.hash(password, 15);

  await prisma.user.create({
    data: {
      username: username,
      password: hashedPass,
    },
  });

  return console.log("User inserted into database table.");
}

module.exports = { getUser, getUserForDeserialize, insertUser };
