import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { RestaurantsContextProvider } from '../context/RestaurantContext';

import Home from './Home';
import RestaurantDetail from './RestaurantDetail';
import UpdatePage from './UpdatePage';

const RouterIndex = () => {
    return (
        <RestaurantsContextProvider>
            <Router>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/restaurants/:id/update" component={UpdatePage} />
                    <Route exact path="/restaurants/:id" component={RestaurantDetail} />
                </Switch>
            </Router>
        </RestaurantsContextProvider>

    )
}

export default RouterIndex;

