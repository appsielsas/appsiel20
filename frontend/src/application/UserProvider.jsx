import { createContext, useState } from "react";
import UserLogin from "../UserLogin";

export const UserContext = createContext();

const UserProvider = (props) => {
  const [user, setUser] = useState(false);

  const signIn = () => {
    setUser(true);
  };

  const signOut = () => {
    window.localStorage.removeItem("loggedAppsielApp");
    setUser(false);
  };

  return (
    <UserContext.Provider value={{ user, signIn, signOut }}>
      {user ? props.children : <UserLogin />}
    </UserContext.Provider>
  );
};

export default UserProvider;
