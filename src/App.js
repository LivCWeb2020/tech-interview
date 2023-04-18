import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Home from './components/Home';
import ExperimentsSummary from './components/ExperimentsSummary';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route path="/experiments" component={ExperimentsSummary}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
