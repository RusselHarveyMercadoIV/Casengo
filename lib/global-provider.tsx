import { createContext, ReactNode, useContext } from "react";
import { useAppwrite } from "./useAppwrite";
import { getUser } from "./appwrite";

// Define the User interface
interface User {
  $id: string;
  name: string;
  email: string;
  avatar: string;
}

// Define the GlobalContextType interface
interface GlobalContextType {
  isLoggedIn: boolean;
  user: User | null;
  loading: boolean;
  refetch: (newParams?: Record<string, string | number>) => Promise<void>;
}

// Create the context
const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

// GlobalProvider component
export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const {
    data: user,
    loading,
    refetch: originalRefetch,
  } = useAppwrite({
    fn: getUser,
  });

  const contextRefetch = (newParams?: Record<string, string | number>) => {
    return originalRefetch(newParams ?? {});
  };

  const isLoggedIn = !!user;
  const userValue = user ?? null;

  console.log(JSON.stringify(user, null, 2));

  return (
    <GlobalContext.Provider
      value={{ isLoggedIn, user: userValue, loading, refetch: contextRefetch }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook to use the context
export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};

export default GlobalProvider;
