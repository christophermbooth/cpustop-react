import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import { Home, SingleProductView } from './pages';
import { TopBanner } from './components';
import './app.scss';

const App = () => {
  return (
    <Router>
      <TopBanner />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/product/:itemId" component={SingleProductView} />
      </Switch>
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById("root"));
