import { createContext, useState, useContext } from "react";

// Create the context
const UserContext = createContext();

// Custom hook to use the UserContext
export const useUser = () => useContext(UserContext);

// Provider component to wrap the application
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Stores the user data

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
