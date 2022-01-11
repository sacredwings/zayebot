import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import cookie from '../utils/cookie';

//https://oauth.vk.com/token?grant_type=password&client_id=2274003&client_secret=hHbZxrka2uZ6jB1inYsH&username=%D0%9B%D0%9E%D0%93%D0%98%D0%9D&password=%D0%9F%D0%90%D0%A0%D0%9E%D0%9B%D0%AC&captcha_key=q24yud&captcha_sid=656412648896
class Reg extends Component {
    constructor () {
        super();
        this.state = {
            phone: '',
            code: '',
            err: null,
            msg: ''
        };

        this.onChange = this.onChange.bind(this);
        this.onClickReg = this.onClickReg.bind(this);
        this.alertErr = this.alertErr.bind(this);
    }

    async onClickReg (event) {
        event.preventDefault();

        let code = this.props.match.params.code;
        //проверка полей
        if (code.length === 32) {

            //запрос
            let result = await axios.post('/api/profile/regActivate', {
                phone: '7' + this.state.phone,
                code: code,
                ref: cookie.get('ref')
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
                    Активация прошла успешно.
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
        let errMsg = this.alertErr();

        return (
            <div className="container">
                <div className="row">
                    <div className="card card-block login-block shadow my-3 mx-auto">
                        <div className="card-header">
                            Подтверждение регистрации
                        </div>
                        {errMsg? <div className="card-body">{errMsg}</div> : null}

                        <div className="card-body">
                            <form onSubmit={this.onClickReg}>
                            <fieldset>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">+7</span>
                                    </div>
                                    <input type="tel" className="form-control" name="phone" placeholder="Введите номер телефона" minLength="10" required value={this.state.phone} onChange={this.onChange} pattern="\d{10}"/>
                                </div>
                                <div className="mb-3"><small id="telHelp" className="form-text text-muted">Телефон может потребоваться в случае восстановления учетной записи.</small></div>
                                <div className="text-right">
                                    <input type="submit" className="btn btn-primary" value="Активация"/>
                                </div>
                            </fieldset>
                            </form>
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
