import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ApolloProvider } from 'react-apollo';

import theme from 'theme';
import apolloClient from 'apolloClient';
import TopNav from 'components/TopNav';
import Home from 'pages/Home';
import Register from 'pages/Register';
import Login from 'pages/Login';
import Projects from 'pages/Projects';
import { CurrentUserProvider } from 'components/CurrentUser';

const App = () => (
  <ApolloProvider client={apolloClient}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <CurrentUserProvider>
          <div className="App">
            <CssBaseline />
            <TopNav />

            <Route path="/" exact component={Home} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/projects" component={Projects} />
          </div>
        </CurrentUserProvider>
      </BrowserRouter>
    </ThemeProvider>
  </ApolloProvider>
);

export default App;
