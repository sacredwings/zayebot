import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import cookie from '../utils/cookie';

//https://oauth.vk.com/token?grant_type=password&client_id=2274003&client_secret=hHbZxrka2uZ6jB1inYsH&username=%D0%9B%D0%9E%D0%93%D0%98%D0%9D&password=%D0%9F%D0%90%D0%A0%D0%9E%D0%9B%D0%AC&captcha_key=q24yud&captcha_sid=656412648896
class OAuthVK extends Component {
    constructor () {
        super();
        this.state = {
            code: '',
            err: null,
            msg: ''
        };

        this.onClickReg = this.onClickReg.bind(this);
    }

    async componentDidMount () {
        this.onClickReg();
    }

    async onClickReg (event) {
        let params = extractGetAll()

        if (params.code) {
            let result = await axios.post('/api/profile/oauthVK', {
                code: params.code,
                ref: cookie.get('ref')
            });
            result = result.data;

            if ((result) && (!result.err)) {
                result = result.response;

                console.log(result)
                //запоминаем состояние
                this.props.Store_myUser(result.login, result.tid, result.token, this.state.remember);
                this.props.history.push('/accounts')
            }
            if (result.err === 412) {
                cookie.clear('ref')
                this.onClickReg();
            }

            //запрос
            //document.location.replace(`https://oauth.vk.com/access_token?client_id=7407409&client_secret=zh5yRE43lBERO5MfkFH4&redirect_uri=https://zayebot.voenset.ru/oauth-vk&code=${params.code}`);
        }

    }

    err () {
        return (
            <div className="alert alert-success" role="alert">
                Текст ошибки
            </div>
        )
    }
    render() {

        return (

            <div className="container">
                <div className="row">
                    <div className="card card-block login-block shadow my-3 mx-auto">
                        <div className="card-header">
                            Авторизация через VK
                        </div>
                        <div className="card-body">
                            <div className="d-flex align-items-center">
                                <strong>Loading...</strong>
                                <div className="spinner-border ml-auto" role="status" aria-hidden="true"></div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }

}

export default connect (
    state => ({

    }),
    dispatch => ({
        Store_myUser: (login, tokenId, tokenKey, remember) => {
            dispatch({type: 'AUTH', login: login, tokenId: tokenId, tokenKey: tokenKey, remember: remember});
        }
    })
)(OAuthVK);

function extractGetAll() {
    let vars = window.location.search.match(new RegExp('[^&?]+', 'gm'));
    let result = {};
    for (var i=0; i < vars.length; i++) {
        var r = vars[i].split('=');
        result[r[0]] =r[1];
    }
    return result;
}