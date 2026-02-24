import { createContext, useEffect, useState, useContext } from "react";

export const UserContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const isLogin = !!user;

  const logout = async () => {
    try {
      await fetch("http://localhost:5000/Logout", {
        method: "POST",
        credentials: "include",
      });
      setUser(null);
    } catch (err) {
      console.log(err);
    }
  };

  const userAuthentication = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/auth", {
        method: "GET",
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    userAuthentication();
  }, []);

  return (
    <UserContext.Provider value={{ user, isLogin, setUser, logout, userAuthentication,loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => {
  const contextvalue = useContext(UserContext);
  if (!contextvalue) {
    throw new Error("useAuth must be used inside UserProvider");
  }
  return contextvalue;
};