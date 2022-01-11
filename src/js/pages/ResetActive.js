import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

//https://oauth.vk.com/token?grant_type=password&client_id=2274003&client_secret=hHbZxrka2uZ6jB1inYsH&username=%D0%9B%D0%9E%D0%93%D0%98%D0%9D&password=%D0%9F%D0%90%D0%A0%D0%9E%D0%9B%D0%AC&captcha_key=q24yud&captcha_sid=656412648896
class Reg extends Component {
    constructor () {
        super();
        this.state = {
            code: '',
            password: '',
            err: null,
            msg: ''
        };

        this.onChange = this.onChange.bind(this);
        this.onClickReg = this.onClickReg.bind(this);
        this.alertErr = this.alertErr.bind(this);
    }

    async componentDidMount () {
        //this.onClickReg();
    }

    async onClickReg (event) {
        let code = this.props.match.params.code;
        let password = this.state.password;

        //проверка полей
        if ((code.length === 32) && (password.length >= 8)){

            //запрос
            let result = await axios.post('/api/profile/resetActivate', {
                code: code,
                password: password
            });
            console.log(result)
            result = result.data;
            console.log(result)
            this.setState({err: result.err, msg: result.msg});
            //ответ со всеми значениями
            if ((result) && (result.err === 0)) {
                console.log('удачно')
                //запоминаем состояние
                //this.setState({err: result.err});
                //this.props.Store_myUser(result.login, result.tid, result.token, this.state.remember);
            }

        }

        if (password.length < 8)
            this.setState({err: 1, msg: 'Пароль должен быть не менее 8 символов'});

        if (code.length !== 32)
            this.setState({err: 1, msg: 'Ссылка по которой вы перешли, не корректна'});


    }

    onChange (event) {
        if (event.target.value.length <= 32) {
            const name = event.target.name;
            this.setState({[name]: event.target.value});
        }
    }

    alertErr () {
        if ((this.state.err !== null) && (this.state.err === 0)) {
            return (
                <div className="alert alert-success" role="alert">
                    Пароль успешно изменен.
                </div>
            )
        }
        if ((this.state.err !== null) && (this.state.err !== 0)) {
            return (
                <div className="alert alert-warning" role="alert">
                    {this.state.msg}
                </div>
            )
        }
    }
    render() {

        return (

            <div className="container">
                <div className="row">
                    <div className="card card-block login-block shadow my-3 mx-auto">
                        <div className="card-header">
                            Изменение пароля
                        </div>
                        <div className="card-body">
                            {this.alertErr()}
                            <form>
                                <p>Введите новый пароль к личному кабинету</p>
                                <fieldset>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" role="img" aria-label="jsx-a11y/accessible-emoji">🔒</span>
                                        </div>
                                        <input type="password" className="form-control form-control-lg" name="password" placeholder="Новый пароль" minLength="8" required="" value={this.state.password} onChange={this.onChange}/>
                                    </div>
                                </fieldset>
                            </form>
                            <div className="text-right">
                                <input type="submit" className="btn btn-primary" value="Изменить" onClick={this.onClickReg}/>
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

    })
)(Reg);

