import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import './App.css';

import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';

import AboutPage from './components/about/About';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Route exact path="/" component={Main} />
          <Route exact path="/about" component={AboutPage} />
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
