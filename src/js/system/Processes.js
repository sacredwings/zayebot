import React, {Component} from 'react';
import {connect} from 'react-redux';
import vk from './requests/vk';

class Processes extends Component {
    constructor () {
        super();
        this.state = {
            timerInterval: null
        }
    }

    componentDidMount() {
        this.timerStart();
    }

    timerStart() {
        //this.state.timerInterval = setInterval(() => this.timer(), 10000);
        //setTimeout(() => this.likes(), 2000);
    }

    timerStop() {
        clearInterval(this.state.timerInterval);
    }

    async likes() {
        //Promise.all

        await vk.likes(this.props.accounts.vk);

    }

    render() {
        return null;
    }

}

export default connect (
    state => ({
        accounts: state.Store_Accounts,
    }),
    dispatch => ({
        store_UserAccess: (list) => {
            dispatch({type: 'ACCOUNTS', list: list});
        }
    })
)(Processes);

