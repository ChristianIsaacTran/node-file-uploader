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
          folderRoute: {
            // This deletes any nested folders inside the deleted folder
            startsWith: pathToFolder,
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

// search and update any folder with the new name
async function updateFolderName(
  currentRoute,
  fullRoute,
  previousFolderName,
  newFolderName,
) {
  const newRoute = `${currentRoute}${newFolderName}/`; //new Route to update in db

  console.log("Updating name on folder...");

  // update main folder with new name and folder route with new route

  const mainFolder = await prisma.folders.updateMany({
    where: {
      AND: [
        {
          folderRoute: fullRoute,
        },
        {
          folderName: previousFolderName,
        },
      ],
    },
    data: {
      folderRoute: newRoute,
      folderName: newFolderName,
    },
  });

  console.log("Updating name on nested folders...");

  // get all the folders with the current folder's route in it for loop update
  let folders = await prisma.folders.findMany({
    where: {
      OR: [
        {
          folderRoute: {
            startsWith: fullRoute,
          },
        },
        {
          parentFolder: {
            equals: previousFolderName,
          },
        },
      ],
    },
  });

  // for each folder, update the sub folder's route info
  folders.forEach(async (folderObj) => {
    // construct new route to replace old route
    const oldRoute = folderObj.folderRoute.split("/");

    // index of the folder name to be replaced
    const replaceFolderIndex = fullRoute.split("/").length - 2;

    oldRoute[replaceFolderIndex] = newFolderName;

    const newRoute = oldRoute.join("/");

    // update all folders that had previous folder name as parent folder
    await prisma.folders.updateMany({
      where: {
        AND: [
          { parentFolder: previousFolderName },
          {
            folderRoute: {
              startsWith: fullRoute,
            },
          },
        ],
      },
      data: {
        parentFolder: newFolderName,
      },
    });

    // update routes and nested routes with the new folder name
    await prisma.folders.updateMany({
      where: {
        AND: [
          {
            folderName: folderObj.folderName,
          },
          {
            folderRoute: {
              startsWith: fullRoute,
            },
          },
        ],
      },
      data: {
        folderRoute: newRoute,
      },
    });
  });

  return console.log("update folder complete.");
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
  updateFolderName,
};
