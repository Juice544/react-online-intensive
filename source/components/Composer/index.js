import React, {Component} from 'react';

import Styles from './styles.m.css';

export default class Composer extends Component {
    render () {
        const {
            avatar,
            currentUserFirstName
        } = this.props
        return (
        <section className = {Styles.composer}>
            <img src = {avatar} />
            <from>  
                <textarea placeholder = {`What's on your mind, ${currentUserFirstName}?`} />
                <input  type = 'submit' value = 'post' />
            </from>
        </section>
        );
    }
}