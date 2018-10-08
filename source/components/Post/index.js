import React, { Component } from 'react';
import moment from 'moment';
import { func, string, array, number } from 'prop-types';

import Like from 'components/Like';

import Styles from './styles.m.css';
import { withProfile } from 'components/HOC/withProfile';

@withProfile
export default class Post extends Component {
    static propTypes = {
        _removePost: func.isRequired,
        _likePost: func.isRequired,
        comment: string.isRequired,
        created: number.isRequired,
        id: string.isRequired,
        likes: array.isRequired,
    }
    _removePost = () => {
        const { _removePost, id } = this.props;

        _removePost(id);
    }
    render () {
        const { comment, created, _likePost, id, likes } = this.props;
        const { avatar, currentUserFirstName, currentUserLastName } = this.props;
        return (
                <section className = {Styles.post}>
                    <span className = {Styles.cross} id = { id } onClick = { this._removePost } ></span> 
                    <img src = { avatar } />
                    <a>{currentUserFirstName} {currentUserLastName}</a>
                    <time>
                        {moment.unix(created).format('MMMM DD h:mm:ss a')}
                    </time>
                    <p>{comment}</p>
                    <Like _likePost = { _likePost } id = { id } likes = { likes } />
                </section>
        );
    }
}
