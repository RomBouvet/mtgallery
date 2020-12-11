import './App.css';
import Navbar from './components/Navbar/Navbar.js';
import { Switch, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Welcome from './views/Welcome/Welcome';
import Cards from './views/Cards/Cards';
import Sets from './views/Sets/Sets';
import Other from './views/Other/Other';

function App() {
  return (
    <BrowserRouter className="appContainer">
      <Navbar></Navbar>
      <div className="app">
        <Switch>
          <Route exact path="/"><Welcome /></Route>
          <Route exact path="/cards"><Cards /></Route>
          <Route exact path="/sets"><Sets /></Route>
          <Route exact path="/other"><Other /></Route>
        </Switch>
      </div>

    </BrowserRouter>
  );
}

export default App;
