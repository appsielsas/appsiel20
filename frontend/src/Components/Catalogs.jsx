import { Button, Container, Grid, Paper, Typography } from "@mui/material";
import { Box, styled } from "@mui/system";
import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { useParams } from "react-router";

function Catalogs({ path }) {
  /**
   * Parametros obtenidos por la URL
   */
  const { app } = useParams();
  /**
   * URL base del modelo actual
   * @type {baseUrl: string}
   */
  const baseUrl = `${process.env.REACT_APP_URL}/api/${path}?app_id=${app}`;
  const [cargando, setCargando] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [data, setData] = useState([]);

  const Icon = styled(Button)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    i: {
      fontSize: "36px",
      height: "70px",
      aspectRatio: "auto 1 / 1",
      borderRadius: "50%",
      backgroundImage: "linear-gradient(to right, #3ab5b0 0%, #3d99be 31%, #56317a 100%)",
      color: "white",
      position: "relative",
      "&:before": {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
      },
    },
  }));

  const requestGet = async () => {
    setCargando(true);
    try {
      await fetch(baseUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("loggedAppsielApp")}`,
        },
      })
        .then((res) => res.json())
        .then((response) => {
          console.log(response);
          setData(response.name);
          setCargando(false);
        })
        .catch((error) => {
          console.log(error.message);
          enqueueSnackbar(error.message, { variant: "error" });
        });
    } catch (e) {
      console.log(e.message);
    }
  };

  const icons = [
    {
      icon: "fab fa-500px",
      label: "",
    },
    {
      icon: "fab fa-500px",
      label: "",
    },
    {
      icon: "fab fa-accusoft",
      label: "",
    },
    {
      icon: "fab fa-accusoft",
      label: "",
    },
    {
      icon: "fab fa-adversal",
      label: "",
    },
    {
      icon: "fab fa-adversal",
      label: "",
    },
    {
      icon: "fab fa-500px",
      label: "",
    },
    {
      icon: "fab fa-500px",
      label: "",
    },
    {
      icon: "fab fa-accusoft",
      label: "",
    },
    {
      icon: "fab fa-accusoft",
      label: "",
    },
    {
      icon: "fab fa-adversal",
      label: "",
    },
    {
      icon: "fab fa-adversal",
      label: "",
    },
  ];

  useEffect(() => {
    //requestGet();
    setData(icons);
  }, [app]);

  return (
    <Container component={Paper} sx={{ p: 3 }}>
      <Typography variant="h2">Catalogo</Typography>
      <hr />
      <Grid container rowSpacing={8} columnSpacing={4} sx={{ width: "100%" }}>
        {data.map((item, index) => (
          <Grid item xs={6} sm={4} md={3} lg={2} key={index}>
            <Icon>
              <i className={item.icon}></i>
              <Typography variant="subtitle1">item.label</Typography>
            </Icon>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Catalogs;
