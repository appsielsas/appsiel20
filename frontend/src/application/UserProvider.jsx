import { Backdrop, CircularProgress } from "@mui/material";
import { createContext, useState } from "react";
import UserLogin from "../UserLogin";
import { useSnackbar } from "notistack";

export const UserContext = createContext();

const UserProvider = (props) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false)
  const { enqueueSnackbar } = useSnackbar();


  const signIn = async (email, password) => {
    setIsLoading(true)
    await requestLogin(email, password)
    await verifyAuth();
    setIsLoading(false)
  };

  const signOut = async () => {
    if (await requestLogout()) {
      window.localStorage.removeItem("loggedAppsielApp");
      setUser(null);
    }
  };

  const requestLogin = async (email, password) => {

    if (!email.trim()) {
      enqueueSnackbar(`Ingrese el email.`, {
        variant: "error",
      });
      return;
    }
    if (!password.trim()) {
      enqueueSnackbar(`Ingrese la contraseña.`, {
        variant: "error",
      });
      return;
    }

    try {
      const response = await fetch(process.env.REACT_APP_URL + "/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: `{"email": "${email}", "password": "${password}"}`,
      });

      const dataG = await response.json();

      if (response.ok) {
        window.localStorage.setItem("loggedAppsielApp", dataG.access_token);
      } else {
        enqueueSnackbar(dataG.error, { variant: "error" });
      }
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
    }
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

  const requestLogout = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_URL + "/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${window.localStorage.getItem("loggedAppsielApp")}`,
        },
      });

      if (response.ok) {
        const { message } = await response.json();
        enqueueSnackbar(message, { variant: "success" });
        return true
      } else {
        return false
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <UserContext.Provider value={{ user, signIn, signOut }}>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {user ? props.children : <UserLogin />}
    </UserContext.Provider>
  );
};

export default UserProvider;
