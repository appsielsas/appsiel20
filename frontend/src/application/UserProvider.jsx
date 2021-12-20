import { createContext, useState } from "react";
import UserLogin from "../UserLogin";

export const UserContext = createContext();

const UserProvider = (props) => {
  const [user, setUser] = useState(null);

  const signIn = async () => {
    verifyAuth();
  };

  const signOut = () => {
    window.localStorage.removeItem("loggedAppsielApp");
    setUser(null);
  };

  const verifyAuth = async () => {
    try {
      const logged = await fetch(process.env.REACT_APP_URL + "/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${window.localStorage.getItem("loggedAppsielApp")}`,
        },
      });

      const userLogged = await logged.json();

      if (logged.ok) {
        setUser(userLogged);
      } else {
        //signOut();
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <UserContext.Provider value={{ user, signIn, signOut }}>
      {user ? props.children : <UserLogin />}
    </UserContext.Provider>
  );
};

export default UserProvider;
