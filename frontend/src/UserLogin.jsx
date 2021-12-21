import { Button, Paper, TextField, Typography } from "@mui/material";
import React from "react";

import { Box } from "@mui/system";
import { UserContext } from "./application/UserProvider";

function UserLogin() {
  const [email, setEmail] = React.useState("randommail@mail.com");
  const [password, setPassword] = React.useState("strongkey123");

  const { signIn } = React.useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault()
    signIn(email, password)
  }

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
      <Paper sx={{ padding: 2, minWidth: "320px", width: "500px" }}>
        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column", gap: 4 }}
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <img
            src="http://demo.appsiel.com.co/assets/img/appsiel-logo.png"
            alt="appsiel"
            style={{ objectFit: "cover" }}
            width="100%"
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
