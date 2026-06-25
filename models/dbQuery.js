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

// insert newly crated user into the db
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
    if (!userId) {
      throw new Error("User id does not exist");
    }

    await prisma.folders.create({
      data: {
        folderRoute: "root/",
        folderName: "root",
        folderUser: {
          connect: {
            id: userId,
          },
        },
        parentFolder: "",
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

// searches the db and gets the folder based on the given folder route, and current logged in user
async function getFolder(route, loggedInUserId) {
  try {
    const currentFolder = await prisma.folders.findFirst({
      where: {
        AND: [
          {
            folderRoute: {
              equals: route,
            },
          },
          {
            folderUserId: { equals: loggedInUserId },
          },
        ],
      },
    });

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

// create a new folder in db with given route and folder name
async function createFolder(currentRoute, folderName, userId, parentFolder) {
  try {
    await prisma.folders.create({
      data: {
        folderRoute: `${currentRoute}${folderName}/`,
        folderName: folderName,
        folderUserId: userId,
        parentFolder: parentFolder,
      },
    });

    return console.log("Created new folder.");
  } catch (error) {
    throw new Error("Cannot create folder");
  }
}

// based on a given folderRoute, return an array of subfolders inside the current folder
async function getSubFolders(currentRoute, loggedInUserId, currentFolder) {
  try {
    // sub-folders will be in the same folder as the currentRoute, up until their name
    const subFolders = await prisma.folders.findMany({
      where: {
        AND: [
          {
            folderRoute: {
              startsWith: currentRoute,
              endsWith: "/",
              mode: "insensitive",
            },
          },
          { folderUserId: { equals: loggedInUserId } },
          { parentFolder: { equals: currentFolder } },
        ],
        NOT: {
          folderRoute: {
            equals: currentRoute,
          },
        },
      },
    });

    return subFolders;
  } catch (error) {
    throw new Error(error);
  }
}

// deletes a folder from the database based on the folder's unique route
async function deleteFolder(pathToFolder, nameOfFolder) {
  await prisma.folders.deleteMany({
    where: {
      OR: [
        {
          folderRoute: {
            equals: pathToFolder,
          },
        },
        {
          folderRoute: { // This deletes any nested folders inside the deleted folder
            startsWith: pathToFolder
          },
        },
        {
          parentFolder: {
            equals: nameOfFolder,
          },
        },
      ],
    },
  });

  // when deleting a folder, it will also delete the files inside that folder.

  return console.log("Folder has been deleted.");
}

module.exports = {
  getUser,
  getUserForDeserialize,
  insertUser,
  checkRootFolderExists,
  getFolder,
  getFiles,
  createFolder,
  getSubFolders,
  deleteFolder,
};
