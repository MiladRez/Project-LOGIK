import React from 'react';
import { App } from './App';
import CompleteForm from './CompleteForm';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

class Router extends React.Component {

    render() {
        return (
            <div>
                <BrowserRouter>
                    <Switch>
                        <Route exact path='/' component={App} />
                        <Route path='/completeForm/:title' component={CompleteForm} />
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

export default Router;