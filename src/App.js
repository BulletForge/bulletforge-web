import React, { useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import theme from 'theme';
import TopNav from 'components/TopNav';
import Home from 'pages/Home';
import Register from 'pages/Register';
import Login from 'pages/Login';
import { getAccessToken, hasAccessToken } from 'utils/accessToken';
import { CurrentUserProvider } from 'components/CurrentUser';

const App = () => {
  const [accessToken, updateAccessToken] = useState(getAccessToken());

  const client = new ApolloClient({
    uri: 'http://localhost:3000/graphql',
    request: async (operation) => {
      if (hasAccessToken()) {
        operation.setContext({
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        });
      }
    },
  });

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <CurrentUserProvider>
            <div className="App">
              <CssBaseline />
              <TopNav updateAccessToken={updateAccessToken} />


              <Route path="/" exact component={Home} />
              <Route path="/register" component={Register} />
              <Route
                path="/login"
                render={props => <Login {...props} updateAccessToken={updateAccessToken} />}
              />
            </div>
          </CurrentUserProvider>
        </BrowserRouter>
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default App;
