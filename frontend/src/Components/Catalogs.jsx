import {
  Button,
  Container,
  Grid,
  Link as LinkMui,
  Paper,
  Skeleton,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import { useSnackbar } from "notistack";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { IconCatalogs } from "../CustomStyles";

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
              <IconCatalogs>
                <Skeleton variant="circular" width={70} height={70} />
                <Typography variant="subtitle1" width="60px">
                  <Skeleton />
                </Typography>
              </IconCatalogs>
            </Grid>
            <Grid item xs={6} sm={4} md={3} lg={2}>
              <IconCatalogs>
                <Skeleton variant="circular" width={70} height={70} />
                <Typography variant="subtitle1" width="60px">
                  <Skeleton />
                </Typography>
              </IconCatalogs>
            </Grid>
            <Grid item xs={6} sm={4} md={3} lg={2}>
              <IconCatalogs>
                <Skeleton variant="circular" width={70} height={70} />
                <Typography variant="subtitle1" width="60px">
                  <Skeleton />
                </Typography>
              </IconCatalogs>
            </Grid>
            <Grid item xs={6} sm={4} md={3} lg={2}>
              <IconCatalogs>
                <Skeleton variant="circular" width={70} height={70} />
                <Typography variant="subtitle1" width="60px">
                  <Skeleton />
                </Typography>
              </IconCatalogs>
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
                <IconCatalogs>
                  <i className={`fas fa-${item.icon}`}></i>
                  <Typography variant="subtitle1">{item.label}</Typography>
                </IconCatalogs>
              </LinkMui>
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
}

export default Catalogs;
