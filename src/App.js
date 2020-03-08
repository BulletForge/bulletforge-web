import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ApolloProvider } from '@apollo/react-hooks';
import { SnackbarProvider } from 'notistack';

import theme from 'theme';
import apolloClient from 'apolloClient';
import TopNav from 'components/TopNav';
import { CurrentUserProvider } from 'components/CurrentUser';

import Home from 'pages/Home';
import Register from 'pages/Register';
import Login from 'pages/Login';
import Projects from 'pages/Projects';
import NewProject from 'pages/NewProject';


const App = () => (
  <ApolloProvider client={apolloClient}>
    <ThemeProvider theme={theme}>
      <SnackbarProvider>
        <BrowserRouter>
          <CurrentUserProvider>
            <div className="App">
              <CssBaseline />
              <TopNav />

              <Route path="/" exact component={Home} />
              <Route path="/register" exact component={Register} />
              <Route path="/login" exact component={Login} />
              <Route path="/projects" exact component={Projects} />
              <Route path="/projects/new" exact component={NewProject} />
            </div>
          </CurrentUserProvider>
        </BrowserRouter>
      </SnackbarProvider>
    </ThemeProvider>
  </ApolloProvider>
);

export default App;
