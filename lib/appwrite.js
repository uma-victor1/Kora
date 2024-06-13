import {
  Client,
  Databases,
  Account,
  Storage,
  ID,
  Avatars,
  Query,
} from "react-native-appwrite";

const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.madfinger.kora",
  projectId: "66410fcf0003be863154",
  databaseId: "66411361003c69cf3241",
  userCollectionId: "66411450001054138b79",
  videoCollectionId: "66411483002fdde4ae70",
  storageId: "66412bce0029e79a8670",
};
const { databaseId, videoCollectionId, userCollectionId, storageId } = config;
const client = new Client();
client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

const account = new Account(client);
const database = new Databases(client);
const storage = new Storage(client);
const avatar = new Avatars(client);

export const getAllPosts = async () => {
  try {
    const posts = await database.listDocuments(databaseId, videoCollectionId);

    return posts.documents;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getLatestPosts = async () => {
  try {
    const posts = await database.listDocuments(databaseId, videoCollectionId, [
      Query.orderDesc("$createdAt", Query.limit(7)),
    ]);

    return posts.documents;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const searchPosts = async (query) => {
  try {
    const posts = await database.listDocuments(databaseId, videoCollectionId, [
      Query.search("title", query),
    ]);

    return posts.documents;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getUserPosts = async (userId) => {
  try {
    const posts = await database.listDocuments(databaseId, videoCollectionId, [
      Query.equal("creators", userId),
    ]);

    return posts.documents;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const signOut = async () => {
  try {
    const result = await account.deleteSessions();

    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};
export async function getCurrentUser() {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;

    const currentUser = await database.listDocuments(
      databaseId,
      userCollectionId,
      [Query.equal("accountid", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

// Upload File
export async function uploadFile(file, type) {
  if (!file) return;

  const { mimeType, ...rest } = file;
  const asset = { type: mimeType, ...rest };

  try {
    const uploadedFile = await storage.createFile(
      storageId,
      ID.unique(),
      asset
    );

    const fileUrl = await getFilePreview(uploadedFile.$id, type);
    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
}

// Get File Preview
export async function getFilePreview(fileId, type) {
  let fileUrl;

  try {
    if (type === "video") {
      fileUrl = storage.getFileView(appwriteConfig.storageId, fileId);
    } else if (type === "image") {
      fileUrl = storage.getFilePreview(
        appwriteConfig.storageId,
        fileId,
        2000,
        2000,
        "top",
        100
      );
    } else {
      throw new Error("Invalid file type");
    }

    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
}

export const createVideoPost = async () => {
  try {
    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFile(form.thumbnail, "image"),
      uploadFile(form.video, "video"),
    ]);

    const newPost = await database.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      ID.unique(),
      {
        title: form.title,
        thumbnail: thumbnailUrl,
        video: videoUrl,
        prompt: form.prompt,
        creator: form.userId,
      }
    );

    return newPost;
  } catch (error) {
    throw new Error(error);
  }
};

export { account, database, avatar, ID, config };
