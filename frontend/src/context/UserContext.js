import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const setUserAndLog = (userData) => {
    console.log("Setting user data:", userData);
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData)); // Store user data in local storage
  };

  const logout = () => {
    console.log("Logging out");
    setUser(null);
    localStorage.removeItem('user'); // Remove user data from local storage on logout
  };

  return (
    <UserContext.Provider value={{ user, setUser: setUserAndLog, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
