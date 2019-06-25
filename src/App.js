import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import TopNav from 'components/TopNav';
import Home from 'pages/Home';
import Register from 'pages/Register';
import { ThemeProvider } from '@material-ui/styles';
import theme from 'theme';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
});

const App = () => (
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <div className="App">
          <TopNav />


          <Route path="/" exact component={Home} />
          <Route path="/register" component={Register} />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  </ApolloProvider>
);

export default App;
