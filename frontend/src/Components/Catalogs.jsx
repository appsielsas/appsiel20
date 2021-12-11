import {
  Button,
  Container,
  Grid,
  Paper,
  Typography,
  Link as LinkMui,
  Skeleton,
} from "@mui/material";
import { Box, styled } from "@mui/system";
import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

function Catalogs({ path }) {
  /**
   * Parametros obtenidos por la URL
   */
  const { app } = useParams();
  /**
   * URL base del modelo actual
   * @type {baseUrl: string}
   */
  const baseUrl = `${process.env.REACT_APP_URL}/api/app_catalogs?app_id=${app}`;
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
      const response = await fetch(baseUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("loggedAppsielApp")}`,
        },
      });

      let dataG = await response.json();

      if (response.ok) {
        setData(dataG);
      }

      setCargando(false);
    } catch (e) {
      console.log(e.message);
      enqueueSnackbar(e.message, { variant: "error" });
    }
  };

  useEffect(() => {
    requestGet();
    //setData(icons);
  }, [app]);

  return (
    <Container component={Paper} sx={{ p: 3 }}>
      <Typography variant="h2">Catalogo</Typography>
      <hr />
      <Grid container rowSpacing={8} columnSpacing={4} sx={{ width: "100%" }}>
        {cargando ? (
          <>
            <Grid item xs={6} sm={4} md={3} lg={2}>
              <Icon>
                <Skeleton variant="circular" width={70} height={70} />
                <Typography variant="subtitle1" width="60px">
                  <Skeleton />
                </Typography>
              </Icon>
            </Grid>
            <Grid item xs={6} sm={4} md={3} lg={2}>
              <Icon>
                <Skeleton variant="circular" width={70} height={70} />
                <Typography variant="subtitle1" width="60px">
                  <Skeleton />
                </Typography>
              </Icon>
            </Grid>
            <Grid item xs={6} sm={4} md={3} lg={2}>
              <Icon>
                <Skeleton variant="circular" width={70} height={70} />
                <Typography variant="subtitle1" width="60px">
                  <Skeleton />
                </Typography>
              </Icon>
            </Grid>
            <Grid item xs={6} sm={4} md={3} lg={2}>
              <Icon>
                <Skeleton variant="circular" width={70} height={70} />
                <Typography variant="subtitle1" width="60px">
                  <Skeleton />
                </Typography>
              </Icon>
            </Grid>
          </>
        ) : (
          data.map((item, index) => (
            <Grid item xs={6} sm={4} md={3} lg={2} key={index}>
              <LinkMui
                component={Link}
                to={`/crud/${item.app_id}/model/${item.model_id}`}
                underline="none"
              >
                <Icon>
                  <i className={`fas fa-${item.icon}`}></i>
                  <Typography variant="subtitle1">{item.label}</Typography>
                </Icon>
              </LinkMui>
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
}

export default Catalogs;
