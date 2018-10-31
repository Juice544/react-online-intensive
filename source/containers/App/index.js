// Core
import React, { Component } from 'react';
//Components
import Catcher from 'components/Catcher';
import Feed from 'components/Feed';
import Profile from 'components/Profile';
import StatusBar from 'components/StatusBar';
import Login from 'components/LoginForm';

import { Provider } from 'components/HOC/withProfile';
import { Switch, Route } from 'react-router-dom';

//Instruments
import avatar from 'theme/assets/lisa';
import Redirect from 'react-router-dom/Redirect';

const options = {
    avatar,
    currentUserFirstName: 'Сергей',
    currentUserLastName:  'Верещагин',
};

export default class App extends Component {

    state = {
        access: false,
    };
    render () {
        return (
            <Catcher>
                <Provider value = { options }>
                    <StatusBar />
                    <Switch>
                        <Route component = { Login } path = '/login' />
                        <Route component = { Feed } path = '/feed' />
                        {this.access && <Route component = { Profile } path = '/profile' />}
                        <Redirect to = '/login' />
                    </Switch>
                </Provider>
            </Catcher>
        );
    }
}
