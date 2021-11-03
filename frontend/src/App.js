import { Container } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import {
  BrowserRouter as Router, Route, Switch
} from "react-router-dom";
import SideBar from './Components/SideBar';
import Users from './Components/Users';
import CustomStyles from './CustomStyles';
import { UserContextProvider } from './application/UserContext'




export default function App() {

  return (

    <Router>
      <CustomStyles>
        <SnackbarProvider maxSnack={7}>
          <SideBar>
            <Switch>
              <Route path="/users/update">
                {/*<ModifyUsers handleChange={handleChange} methodPut={requestPut}></ModifyUsers>*/}
              </Route>
              <Route path="/users/insert">
                {/*<CreateUsers handleChange={handleChange} methodPost={requestPost}></CreateUsers>*/}
              </Route>
              <Route path="/users">
                <UserContextProvider>
                  <Users />
                </UserContextProvider>
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