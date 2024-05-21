import React, { createContext, useContext, useState } from "react";

export const UserNameContext = createContext();

const { Provider } = UserNameContext;

export const UserNameProvider = ({ children }) => {
   const [useAdminState, setUserAdminState] = useState(false);

  let token = localStorage.getItem("token");

  if (token) {
    setUserAdminState(true);
  }
console.log(useAdminState);
  return <Provider value={{ useAdminState ,setUserAdminState}}>{children}</Provider>;
};
