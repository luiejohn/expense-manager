import React, { Component } from 'react';
import { Container } from 'reactstrap'
import './App.scss';
import { Switch, Route } from 'react-router-dom';
import Expenses from './components/containers/Expenses/Expenses';
import Home from './components/containers/Home/Home';
import Navigation from './components/common/Navigation/Navigation';

class App extends Component {

  render() {

    return (
      <div className="App_container">
        <Navigation />

        <div className="App_main">
          <Container className="Main_cont">
            <Switch>
              <Route exact path="/expenses" render={() => <Expenses />} />
              <Route exact path="/" component={Home} />
            </Switch>
          </Container>
        </div>

      </div>
    );
  }

}

export default App;
