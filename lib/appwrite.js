import {
  Client,
  Databases,
  Account,
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
const { databaseId, videoCollectionId } = config;
const client = new Client();
client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

const account = new Account(client);
const database = new Databases(client);
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
      Query.equal("generator", userId),
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

export { account, database, avatar, ID, config };
