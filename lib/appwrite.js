import { Client, Databases, Account, ID } from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.madfinger.kora",
  projectId: "66410fcf0003be863154",
  databaseId: "66411361003c69cf3241",
  userCollectionId: "66411450001054138b79",
  videoCollectionId: "66411483002fdde4ae70",
  storageId: "66412bce0029e79a8670",
};

const client = new Client();
client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId) // Replace with your project ID
  .setPlatform(config.platform);

const account = new Account(client);

// Register User
export const createUser = () => {
  account
    .create(ID.unique(), "umavictor11@gmail.com", "umacv.123", "Uma Victor")
    .then(
      function (response) {
        console.log(response);
      },
      function (error) {
        console.log(error);
      }
    );
};
