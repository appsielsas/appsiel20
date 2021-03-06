import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {
  Breadcrumbs, Grid,
  IconButton, Link as LinkMui, Paper,
  Tab,
  Tabs,
  Tooltip,
  Typography
} from "@mui/material";
import { Box } from "@mui/system";
import React, { Fragment, useEffect } from "react";
import { useParams } from "react-router";
import Generic from "./GenericComp/Generic";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Show = (props) => {
  /**
   * Parametros obtenidos por la URL
   */
  const { app, model, id } = useParams();

  const [value, setValue] = React.useState(0);
  const [data, setData] = React.useState({ fields: [], tabs: [] });
  const baseUrl = `${process.env.REACT_APP_URL}/api/crud/${id}?app_id=${app}&model_id=${model}`;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const requestGet = async () => {
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
        console.log(dataG);
      } else {
        //Validator(dataG, response.status)
      }
    } catch (e) {
      console.log(e.message);
      //enqueueSnackbar(e.message, { variant: 'error' });
    }
  };

  useEffect(() => {
    requestGet();
  }, []);

  return (
    <>
      <Breadcrumbs aria-label="breadcrumb">
        <LinkMui underline="hover" color="inherit" to="/">
          Appsiel
        </LinkMui>
        <LinkMui underline="hover" color="inherit" to="/users/">
          {app}
        </LinkMui>
        <LinkMui underline="hover" color="inherit" to="/users/">
          {model}
        </LinkMui>
        <Typography color="inherit">Registros</Typography>
      </Breadcrumbs>
      <hr />
      <Typography variant="h3">Vista Show</Typography>
      <Box component={Paper} sx={{ p: 4 }}>
        <Grid container spacing={2}>
          {data.fields.map((i) => (
            <Fragment key={i.id + i.label}>
              <Grid item xs={4} sm={2} md={1}>
                <Typography variant="subtitle2">{i.label}</Typography>
              </Grid>
              <Grid item xs={8} sm={4} md={3}>
                <Typography variant="body2">
                  {i.value}
                  <Tooltip title="Copiar al portapapeles">
                    <IconButton
                      color="secondary"
                      onClick={() => navigator.clipboard.writeText(i.value)}
                      size="small"
                    >
                      <ContentCopyIcon fontSize="inherit" />
                    </IconButton>
                  </Tooltip>
                </Typography>
              </Grid>
            </Fragment>
          ))}
        </Grid>
      </Box>
      <Box sx={{ borderBottom: 1, borderColor: "divider", marginTop: 4 }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          {data.tabs.map((item, i) => (
            <Tab label={item.label} {...a11yProps(i)} key={item.label + i} />
          ))}
        </Tabs>
      </Box>
      {data.tabs.map((item, i) => (
        <TabPanel value={value} index={i} key={value + i}>
          <Generic path={false} tab={i} breadcrumbs={false}></Generic>
        </TabPanel>
      ))}
    </>
  );
};

export default Show;
