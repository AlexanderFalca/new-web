import React from 'react';
import { Switch , Route} from 'react-router-dom'
import Dashboard from '../pages/Dashboard';
import Repositories from '../pages/Repositories';

const Routes:React.FC = () => {
    return (
        <Switch>
            <Route path="/" exact component={Dashboard} />
            <Route path="/Repositories" component={Repositories} />
        </Switch>
    );
  }
  
  export default Routes;