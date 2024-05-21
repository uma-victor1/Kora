import SignIn from "../app/(auth)/sign-in";
import { account, ID } from "../lib/appwrite";
import { useState, useEffect, createContext, useContext } from "react";

const GlobalContext = createContext();

/**
 * Custom React hook that provides access to the GlobalContext value.
 * @returns {*} The current value of GlobalContext
 */
export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export const UseGlobalProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const createUser = async (username, email, password) => {
    try {
      const userAccount = await account.create(
        ID.unique(),
        username,
        email,
        password
      );
      if (!userAccount) {
        throw new Error("User creation failed");
      }
      const user = await signIn(email, password);
      setUser(user);
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  };

  const signIn = async (email, password) => {
    try {
      const loggedIn = await account.createEmailSession(email, password);
      if (!loggedIn) throw new Error("couldn't sign in (signin function)");
      return loggedIn;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  async function logout() {
    try {
      await account.deleteSession("current");
      setUser(null);
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }

  async function init() {
    try {
      const loggedIn = await account.get();
      setUser(loggedIn);
    } catch (err) {
      setUser(null);
    }
  }
  useEffect(() => {
    init();
  }, []);

  return (
    <GlobalContext.Provider
      value={{ user, setUser, loading, setLoading, createUser, signIn, logout }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
