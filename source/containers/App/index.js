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

    componentDidMount () {
        const auth = JSON.parse(localStorage.getItem("lectrum-auth"));

        if (auth && auth.isAuth) {
            this.setState(() => ({
                access: auth,
            }));
        } else {
            localStorage.setItem(
                "lectrum-auth",
                JSON.stringify({ isAuth: false })
            );
        }
    }

    _login = () => {
        this.setState({
            access: true,
        });

        localStorage.setItem("lectrum-auth", JSON.stringify({ isAuth: true }));
    };

    _logout = () => {
        this.setState({
            access: false,
        });

        localStorage.removeItem("lectrum-auth");
    };

    render () {
        const { access } = this.state;

        const privateComponents = (
            <>
                <StatusBar _logout = { this._logout } />
                <Switch>
                    <Route component = { Feed } path = '/feed' />
                    <Route component = { Profile } path = '/profile' />
                    <Redirect to = '/feed' />
                </Switch>
            </>
        );

        const publicComponent = (
            <Switch>
                <Route
                    path = '/login'
                    render = { () => {
                        return <Login _login = { this._login } />;
                    } }
                />
                <Redirect to = '/login' />
            </Switch>
        );

        const comp = access ? privateComponents : publicComponent;

        return (
            <Catcher>
                <Provider value = { options }>{comp}</Provider>
            </Catcher>
        );
    }
}
