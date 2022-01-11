import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import axios from 'axios';

//https://oauth.vk.com/token?grant_type=password&client_id=2274003&client_secret=hHbZxrka2uZ6jB1inYsH&username=%D0%9B%D0%9E%D0%93%D0%98%D0%9D&password=%D0%9F%D0%90%D0%A0%D0%9E%D0%9B%D0%AC&captcha_key=q24yud&captcha_sid=656412648896
class Auth extends Component {
    constructor () {
        super();
        this.state = {
            profileLogin: '',
            profilePassword: '',
            info: null,
            remember: false
        };

        this.onChange = this.onChange.bind(this);
        this.onChangeRemember = this.onChangeRemember.bind(this);
        this.onClickAuth = this.onClickAuth.bind(this);

    }

    async onClickAuth (event) {
        //проверка полей
        if ((this.state.profileLogin.length >= 5) && (this.state.profilePassword.length >= 8)) {

            //запрос
            let result = await axios.post('/api/auth/login', {
                login: this.state.profileLogin,
                password: this.state.profilePassword
            });

            result = result.data;

            //ответ со всеми значениями
            if ((!result.err) && (result.response)) {
                //запоминаем состояние
                this.props.Store_myUser(result.response.login, result.response.tid, result.response.token, this.state.remember);
                this.props.history.push('/accounts')
            } else {
                this.setState({info: result.msg})
            }

        } else {
            this.setState({info: 'Не верный логин или пароль'})
        }

    }

    onChange (event) {
        if (event.target.value.length <= 30) {
            const name = event.target.name;
            this.setState({[name]: event.target.value});
        }

        this.setState({info: null})
    }

    onChangeRemember(event) {
        this.setState({remember: event.target.value});
    }

    render() {

        return (
            <div className="container auth">
                <div className="row">
                    <div className="card card-block login-block shadow my-3 mx-auto">
                        <div className="card-header">
                            Вход в личный кабинет
                        </div>
                        <div className="card-body">
                            {(this.state.info) ?
                                <div className="alert alert-warning" role="alert">
                                    {this.state.info}
                                </div> : null
                            }

                            <form>
                                <fieldset>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" role="img" aria-label="jsx-a11y/accessible-emoji">📧</span>
                                        </div>
                                        <input type="text" className="form-control form-control-lg" name="profileLogin" placeholder="Email" minLength="5" required="" value={this.state.profileLogin} onChange={this.onChange}/>
                                    </div>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" role="img" aria-label="jsx-a11y/accessible-emoji">🔒</span>
                                        </div>
                                        <input type="password" className="form-control form-control-lg" name="profilePassword" placeholder="Пароль" minLength="8" required="" value={this.state.profilePassword} onChange={this.onChange} autoComplete="new-password"/>
                                    </div>
                                    <hr/>
                                    <div className="">
                                        <p>Авторизация (регистрация)</p>
                                        <p></p>
                                        <p><a href="https://oauth.vk.com/authorize?client_id=7407409&display=page&redirect_uri=https://zayebot.voenset.ru/oauth-vk&scope=email&response_type=code&v=5.103"><img src="soc_ico/vk.svg"/></a></p>
                                    </div>
                                    <div className="d-flex justify-content-between mb-3">
                                        <div className="custom-control custom-switch">
                                            <input type="checkbox" className="custom-control-input" name="remember" id="remember" onChange={this.onChangeRemember}/>
                                            <label className="custom-control-label" htmlFor="remember">Запомнить меня</label>
                                        </div>
                                        <Link to="/reset">Забыли пароль?</Link>
                                    </div>
                                </fieldset>
                            </form>
                            <div className="text-right">
                                <input type="submit" className="btn btn-primary" value="Войти" onClick={this.onClickAuth}/>
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
)(Auth);

