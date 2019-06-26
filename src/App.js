import React from 'react';
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

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
});

const App = () => (
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <div className="App">
          <CssBaseline />
          <TopNav />


          <Route path="/" exact component={Home} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  </ApolloProvider>
);

export default App;
