import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Home from './components/Home'
import ExperimentsSummary from './components/ExperimentsSummary'
import ExperimentDetails from './components/ExperimentDetails'
import NotFoundPage from './components/404'

function App() {
  return (
    <Router>
      <div className='App'>
        <Switch>
          <Route exact path='/' component={Home}></Route>
          <Route
            exact
            path='/experiments'
            component={ExperimentsSummary}
          ></Route>
          <Route path='/experiments/:id' component={ExperimentDetails}></Route>
          <Route path='/404/' component={NotFoundPage}></Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
