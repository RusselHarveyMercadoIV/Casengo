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
  // Use the useAppwrite hook to fetch user data
  const {
    data: user,
    loading,
    refetch: originalRefetch, // Rename to avoid naming conflict
  } = useAppwrite({
    fn: getUser,
  });

  // Wrap refetch to handle optional newParams
  const contextRefetch = (newParams?: Record<string, string | number>) => {
    // If newParams is provided, use it; otherwise, use an empty object
    return originalRefetch(newParams ?? {});
  };

  // Determine if the user is logged in
  const isLoggedIn = !!user;
  // Ensure user is null if undefined
  const userValue = user ?? null;

  // Optional: Log user data for debugging
  console.log(JSON.stringify(user, null, 2));

  // Provide context value
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
