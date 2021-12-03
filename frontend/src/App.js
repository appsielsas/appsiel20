import { Container, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import {
  BrowserRouter as Router, Route, Switch, useParams
} from "react-router-dom";
import Generic from './Components/GenericComp/Generic';
import PdfCreator from './Components/Report/PdfCreator';
import Report from './Components/Report/Report';
import SideBar from './Components/SideBar';
import Users from './Components/ModelUser/Users';
import CustomStyles, { ColorModeContext } from './CustomStyles';
import UserProvider from './application/UserProvider';
import Catalogs from './Components/Catalogs';

export default function App() {
  const pathGenerics = "crud"
  const pathCatalogs = "app_catalogs"

  return (

    <Router>
      <CustomStyles>
        <SnackbarProvider maxSnack={7}>

          <UserProvider>
            <SideBar>
              <Switch>
                <Route path="/api/core/users" exact>
                  <Users />
                </Route>
                <Route path="/report" exact>
                  <Report></Report>
                </Route>
                <Route path="/pdfcreator" exact>
                  <PdfCreator></PdfCreator>
                </Route>
                <Route path={`/${pathGenerics}/:app/:model`}>
                  {/* app_catalogs?app */}
                  <Generic path={pathGenerics}></Generic>
                </Route>
                <Route path={`/${pathCatalogs}/:app`}>
                  {/* app_catalogs?app */}
                  <Catalogs path={pathGenerics}></Catalogs>
                </Route>
                <Route path="/">
                  <Container >
                    <Box component={Paper} sx={{ width: '100%', p: 3 }}>
                      <Typography variant="h1">Inicio Dashboard Appsiel</Typography>
                    </Box>
                  </Container>
                </Route>
              </Switch>
            </SideBar>
          </UserProvider>
        </SnackbarProvider>
      </CustomStyles>
      <div>


        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}

      </div>
    </Router >
  );
}