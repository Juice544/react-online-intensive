import React, { Component } from 'react';

import { withProfile } from 'components/HOC/withProfile';
import { Link } from 'react-router-dom';

import Styles from './styles.m.css';

@withProfile
export default class Login extends Component {

    render () {

        return (
            <section className = { Styles.login }>
                <Link to = '/profile' ><span>Войти</span></Link>
            </section>
        );
    }
}
