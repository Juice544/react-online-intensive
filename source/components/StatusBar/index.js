import React, { Component } from 'react';

import Styles from './styles.m.css';

import { withProfile } from 'components/HOC/withProfile';

@withProfile
export default class Composer extends Component {
    render () {
        const { avatar, currentUserFirstName, currentUserLastName } = this.props; 
        return (
            <section className = {Styles.statusBar}>
                <button>
                    <img src = { avatar } />
                    <span>{ currentUserFirstName }</span>
                        &nbsp;
                    <span>{ currentUserLastName }</span>
                </button>
            </section>
        );
    }
};