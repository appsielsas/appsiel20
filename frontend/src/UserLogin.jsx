import { Button, Paper, TextField, Typography } from "@mui/material";
import React from "react";
import { useSnackbar } from "notistack";
import { Box } from "@mui/system";
import { UserContext } from "./application/UserProvider";

function UserLogin() {
  const [email, setEmail] = React.useState("randommail@mail.com");
  const [password, setPassword] = React.useState("strongkey123");
  const { enqueueSnackbar } = useSnackbar();
  const { signIn } = React.useContext(UserContext);

  const requestPost = async (e) => {
    e.preventDefault();

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

      let dataG = await response.json();

      console.log(dataG);

      if (response.ok) {
        console.log("ok");
        signIn();
        window.localStorage.setItem("loggedAppsielApp", dataG.token);
      } else {
        console.log("error");
        enqueueSnackbar(dataG.error, { variant: "error" });
      }
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };

  React.useEffect(() => {
    const verifyAuth = async () => {
      try {
        const logged = await fetch(process.env.REACT_APP_URL + "/api/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${window.localStorage.getItem("loggedAppsielApp")}`,
          },
        });
        if (logged.ok) {
          signIn();
        } else {
          //signOut();
        }
      } catch (e) {
        console.log(e);
      }
    };
    verifyAuth();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        pt: 6,
        height: "100vh",
        backgroundImage: "linear-gradient(to right, #3ab5b0 0%, #3d99be 31%, #56317a 100%)",
      }}
    >
      <Paper sx={{ padding: 2, width: "500px" }}>
        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column", gap: 4 }}
          onSubmit={requestPost}
          autoComplete="off"
        >
          <img
            src="http://demo.appsiel.com.co/assets/img/appsiel-logo.png"
            alt="appsiel"
            style={{ objectFit: "cover" }}
          />
          <Typography variant="h4" style={{ textAlign: "center" }}>
            Iniciar Sesión
          </Typography>
          <TextField
            fullWidth
            name="email"
            type="email"
            label="Correo"
            variant="outlined"
            onChange={(e) => setEmail(e.target.value)}
            onBlur={(e) => setEmail(e.target.value)}
            value={email}
          />
          <TextField
            fullWidth
            name="password"
            type="password"
            label="Contraseña"
            variant="outlined"
            onChange={(e) => setPassword(e.target.value)}
            onBlur={(e) => setPassword(e.target.value)}
            value={password}
          />
          <Button type="submit" variant="contained" size="large">
            Iniciar sesión
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default UserLogin;
