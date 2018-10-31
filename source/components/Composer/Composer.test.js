import React from 'react';
import { mount } from 'enzyme';
import { Composer } from './';

const avatar = '';
const currentUserFirstName = 'Сергей';

const props = {
    _createPost:     jest.fn(),
    avatar,
    currentUserFirstName,
    _preventDefault: jest.fn(),
};

const comment = 'Merry Christmas';

const initialState = {
    comment: '',
};

const updatedSate = {
    comment,
};

const result = mount(<Composer { ...props } />);

const _submitCommentSpy = jest.spyOn(result.instance(), '_submitComment');
const _handleFormSubmitSpy = jest.spyOn(result.instance(), '_handleFormSubmit');

describe('Composer component:', () => {
    test('should have 1 <section> element', () => {
        expect(result.find('section')).toHaveLength(1);
    });

    test('should have 1 <form> element', () => {
        expect(result.find('form')).toHaveLength(1);
    });

    test('should have 1 <textarea> element', () => {
        expect(result.find('textarea')).toHaveLength(1);
    });

    test('should have 1 <input> element', () => {
        expect(result.find('input')).toHaveLength(1);
    });

    test('should have 1 <img> element', () => {
        expect(result.find('img')).toHaveLength(1);
    });

    test('should have valid initial state', () => {
        expect(result.state()).toEqual(initialState);
    });

    test('textarea value should be empty initially', () => {
        expect(result.find('textarea').text()).toBe('');
    });

    test('should respond to state change properly', () => {
        result.setState({
            comment,
        });

        expect(result.state()).toEqual(updatedSate);
        expect(result.find('textarea').text()).toBe(comment);

        result.setState({
            comment: '',
        });

        expect(result.state()).toEqual(initialState);
        expect(result.find('textarea').text()).toBe('');
    });

    test('should handle textarea <change> event', () => {
        result.find('textarea').simulate('change', {
            target: {
                value: comment,
            },
        });

        expect(result.find('textarea').text()).toBe(comment);
        expect(result.state()).toEqual(updatedSate);
    });

    test('should handle form <submit> event', () => {
        result.find('form').simulate('submit');

        expect(result.state()).toEqual(initialState);
    });

    test('_createPost prop should be invoked once after form submissions', () => {
        expect(props._createPost).toHaveBeenCalledTimes(1);
    });

    test('_submitComment and _handleFormSubmit class methods should be invoked once after form is submitted', () => {
        expect(_submitCommentSpy).toHaveBeenCalledTimes(1);
        expect(_handleFormSubmitSpy).toHaveBeenCalledTimes(1);
    });

    test('currentUserFirstName should be a string', () => {
        expect(typeof result.prop('currentUserFirstName')).toBe('string');
    });

    test('avatar should be a string', () => {
        expect(typeof result.prop('avatar')).toBe('string');
    });

    test('should call e.preventDefault() and this._submitComment when invoked onKeyPress handler', () => {
        jest.clearAllMocks();
        result.instance()._submitOnEnter({
            preventDefault: props._preventDefault,
            key:            'Enter',
        });

        expect(props._preventDefault).toHaveBeenCalledTimes(1);
        expect(_submitCommentSpy).toHaveBeenCalledTimes(1);
    });

    test('should not call e.preventDefault and this._submitComment any other key is pressed ', () => {
        jest.clearAllMocks();
        result.instance()._submitOnEnter({
            preventDefault: props._preventDefault,
        })
});

    test('should handle input "onChange" event', () => {
        result.find('input').simulate('change');

        expect(result.state()).toEqual(initialState);
    });
});
