import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";

import Main from './components/Main/Main';
import Qr_code from './components/QrScanner/Qr_code.js';
import Queue from "./components/Queue/Queue";
import SignInForm from './components/SignInForm/SignInForm';
import Organ from './components/Organ/Organ';
import About from './components/About/About';
import Contacts from './components/Contacts/Contacts';

import './App.css';

class App extends React.Component {
  render() {
    return (
      <>
        <Router>
          <Route exact path="/" component={ Main } />
          <Route path='/qr_code' component={ Qr_code } />
          <Route path='/signin_form' component={ SignInForm} />
          <Route path='/organ' component={ Organ } />
          <Route path='/about' component={ About } />
          <Route path='/contacts' component={ Contacts } />
          <Route path='/queue' component={ Queue } />
        </Router>
</>
    );
  };
};

export default App;
