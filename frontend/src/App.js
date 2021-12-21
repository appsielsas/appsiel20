import { Box, Container, Paper, Typography } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import {
  BrowserRouter as Router, Route, Switch
} from "react-router-dom";
import UserProvider from './application/UserProvider';
import Catalogs from './Components/Catalogs';
import Generic from './Components/GenericComp/Generic';
import GenericListLines from './Components/GenericComp/GenericListLines';
import SideBar from './Components/Layout';
import Users from './Components/ModelUser/Users';
import PdfCreator from './Components/Report/PdfCreator';
import Report from './Components/Report/Report';
import Show from './Components/Show';


export default function App() {
  const pathGenerics = "crud"
  const pathCatalogs = "app_catalogs"

  return (

    <Router>
      {/*<CustomStyles>*/}
      <SnackbarProvider maxSnack={7}>
        <UserProvider>
          <SideBar>
            <Switch>
              <Route path="/user" exact>
                <Users />
              </Route>
              <Route path="/report" exact>
                <Report></Report>
              </Route>
              <Route path="/show" render={() => <GenericListLines key={'tableEditable'} />} exact>

              </Route>
              <Route path="/pdfcreator" exact>
                <PdfCreator></PdfCreator>
              </Route>
              <Route path={`/${pathGenerics}/:app/model/:model/index/:id`}>
                {/* vista index 
                <Generic breadcrumbs={false}></Generic>*/}
                <Show></Show>
              </Route>
              <Route path={[`/${pathGenerics}/:app/model/:model/page/:page`, `/${pathGenerics}/:app/model/:model`]}>
                {/* vista show */}
                <Generic></Generic>
              </Route>
              <Route path={`/${pathCatalogs}/:app`}>
                {/* app_catalogs?app */}
                <Catalogs path={pathGenerics}></Catalogs>
              </Route>
              <Route path="/">
                <Container >
                  <Box component={Paper} sx={{ width: '100%', p: 3 }}>
                    <Typography variant="h1">Inicio Appsiel</Typography>
                  </Box>
                </Container>
              </Route>
            </Switch>
          </SideBar>
        </UserProvider>
      </SnackbarProvider>
    </Router >
  );
}