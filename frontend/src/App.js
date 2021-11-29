import { Container } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import {
  BrowserRouter as Router, Route, Switch, useParams
} from "react-router-dom";
import { UserContextProvider } from './application/UserContext';
import Generic from './Components/GenericComp/Generic';
import PdfCreator from './Components/PdfCreator';
import SideBar from './Components/SideBar';
import Users from './Components/Users';
import CustomStyles, { ColorModeContext } from './CustomStyles';


export default function App() {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  return (

    <Router>
      <CustomStyles>
        <SnackbarProvider maxSnack={7}>
          <SideBar>
            <Switch>
              <Route path="/api/core/users" exact>
                <UserContextProvider>
                  <Users />
                </UserContextProvider>
              </Route>
              <Route path="/pdfcreator" exact>
                <PdfCreator></PdfCreator>
              </Route>
              <Route path="/:aplication/:module/:models">
                <Generic></Generic>
              </Route>

              <Route path="/">
                <Container>
                  <Box component={Paper} sx={{ width: '100%', p: 3 }}>
                    <h1 >Inicio Dashboard</h1>
                  </Box>
                </Container>
              </Route>
            </Switch>
          </SideBar>
        </SnackbarProvider>
      </CustomStyles>
      <div>


        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}

      </div>
    </Router>
  );
}