const { prisma } = require("./prisma");
const bcrypt = require("bcryptjs");

// returns user based on given database unique id from session
async function getUserForDeserialize(searchId) {
  try {
    const intId = Number(searchId);

    const user = await prisma.user.findUnique({
      where: {
        id: searchId,
      },
    });

    return user;
  } catch (error) {
    throw new Error(error);
  }
}

// returns the user based on their unique username
async function getUser(username) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        username: {
          equals: username,
        },
      },
    });

    return user;
  } catch (error) {
    throw new Error(error);
  }
}

async function insertUser(username, password) {
  try {
    const hashedPass = await bcrypt.hash(password, 15);

    await prisma.user.create({
      data: {
        username: username,
        password: hashedPass,
      },
    });

    return console.log("User inserted into database table.");
  } catch (error) {
    throw new Error(error);
  }
}

// creates a new root folder inside the Folders table
async function createRootFolder(userId) {
  try {
    await prisma.folders.create({
      data: {
        folderRoute: "root/",
        folderName: "root",
        folderUser: {
          connect: {
            id: userId,
          },
        },
      },
    });
  } catch (error) {
    throw new Error(error);
  }
}

//returns root folder based on userId from db
async function checkRootFolderExists(userId) {
  try {
    const rootFolder = await prisma.folders.findFirst({
      where: {
        AND: [
          {
            folderUserId: {
              equals: userId,
            },
          },
          {
            folderName: {
              equals: "root",
            },
          },
        ],
      },
    });

    // if root not found, run the query to make a root folder for the user by default
    if (!rootFolder) {
      console.log("no root folder found. Creating root folder...");
      return createRootFolder(userId);
    }

    console.log("root folder found.");
    return rootFolder;
  } catch (error) {
    throw new Error(error);
  }
}

// searches the db and gets the folder based on the given folder route
async function getFolder(route) {
  try {
    const currentFolder = await prisma.folders.findFirst({
      where: {
        folderRoute: {
          equals: route,
        },
      },
    });

    if (!currentFolder) {
      throw new Error("folder not found in database.");
    }

    return currentFolder;
  } catch (error) {
    throw new Error(error);
  }
}

// search for all files inside the current folder based on folder id
async function getFiles(folderId) {
  try {
    const files = await prisma.file.findMany({
      where: {
        fileFolderId: {
          equals: folderId,
        },
      },
    });

    if (!files) {
      throw new Error("Cannot find files in database");
    }

    return files;
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = {
  getUser,
  getUserForDeserialize,
  insertUser,
  checkRootFolderExists,
  getFolder,
  getFiles
};
