import './App.css';
import Navbar from './components/Navbar/Navbar.js';
import { Switch, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Welcome from './views/Welcome/Welcome';
import Cards from './views/Cards/Cards';
import Sets from './views/Sets/Sets';
import Other from './views/Other/Other';
import CardViewer from './views/CardViewer/CardViewer';

function App() {
  return (
    <BrowserRouter>
      <Navbar></Navbar>
      <div class="flex flex-col items-center">
          <Switch>
            <Route exact path="/"><Welcome /></Route>
            <Route exact path="/cards"><Cards /></Route>
            <Route exact path="/cards/:id/"><CardViewer/></Route>
            <Route exact path="/sets"><Sets /></Route>
            <Route exact path="/other"><Other /></Route>
          </Switch>
      </div>

    </BrowserRouter>
  );
}

export default App;
