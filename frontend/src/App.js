import Box from '@mui/material/Box';
import React from 'react';
import {
  BrowserRouter as Router, Route, Switch
} from "react-router-dom";
import SideBar from './Components/SideBar';
import Users from './Components/Users';
import CustomStyles from './CustomStyles';
import { SnackbarProvider, useSnackbar } from 'notistack';



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
                <Users></Users>
              </Route>
              <Route path="/">
                <Box sx={{ width: '100%', }}>
                  <h1>Inicio Dashboard</h1>
                </Box>
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