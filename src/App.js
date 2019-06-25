import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import TopNav from './components/TopNav';
import Home from './pages/Home';
import Register from './pages/Register';

const App = () => (
  <BrowserRouter>
    <div className="App">
      <TopNav />


      <Route path="/" exact component={Home} />
      <Route path="/register" component={Register} />
    </div>
  </BrowserRouter>
);

export default App;
