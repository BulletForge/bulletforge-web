import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import TopNav from 'components/TopNav';
import Home from 'pages/Home';
import Register from 'pages/Register';
import { ThemeProvider } from '@material-ui/styles';
import theme from 'theme';

const App = () => (
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <div className="App">
        <TopNav />


        <Route path="/" exact component={Home} />
        <Route path="/register" component={Register} />
      </div>
    </BrowserRouter>
  </ThemeProvider>
);

export default App;
