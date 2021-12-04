import { Breadcrumbs, Container, Grid, Paper, Tab, Tabs, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

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
  const [value, setValue] = React.useState(0);
  const [data, setData] = React.useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    console.log(props.data);
    for (const property in props.data) {
      setData(data.concat(...data, { field: property, value: props.data[property] }));
    }
  }, [props.data]);

  return (
    <>
      {/*<Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" to="/">
          Appsiel
        </Link>
        <Link underline="hover" color="inherit" to="/users/">
          {useParams().app}
        </Link>
        <Link underline="hover" color="inherit" to="/users/">
          {useParams().model}
        </Link>
        <Typography color="text.primary">Index</Typography>
      </Breadcrumbs>
      <hr />*/}
      <Container component={Paper} sx={{ p: 4 }}>
        <Typography variant="h3">Vista Show</Typography>
        <hr />
        <Grid container spacing={2}>
          {data.map((i) => (
            <Grid container item xs={6} md={4} spacing={3}>
              <Grid item>
                <Typography variant="subtitle2">{i.field}</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2">{i.value}</Typography>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Box sx={{ borderBottom: 1, borderColor: "divider", marginTop: 4 }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </>
  );
};

export default Show;
