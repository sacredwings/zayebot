import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

class Settings extends Component {
    constructor () {
        super();
        this.state = {
            password: '',
            password_replay: '',
            err: null,
            errText: '',

            phone: ''
        };

        this.onChange = this.onChange.bind(this);
        this.onSavePassword = this.onSavePassword.bind(this);
        this.onSavePhone = this.onSavePhone.bind(this);

    }

    onChange (event) {
        if (event.target.value.length <= 30) {
            const name = event.target.name;
            this.setState({[name]: event.target.value});
        }
    }

    async onSavePassword () {
        //проверка полей
        if ((this.state.password.length >= 8) && (this.state.password_replay.length >= 8) && (this.state.password === this.state.password_replay)) {

            //стираем ошибки
            this.setState({err: 0});

            //запрос
            let result = await axios.post('/api/profile/setPassword', {
                password: this.state.password
            });

            result = result.data.response;

            if (result) {this.setState({err: 0, errText: 'Пароль изменен'});}
            console.log(result)

        } else {
            if (this.state.password.length < 8) {this.setState({err: 1, errText: 'Пароль мешьше 8 символов'});}
            if (this.state.password !== this.state.password_replay) {this.setState({err: 1, errText: 'Пароли не совпадают'});}
        }
    }
    async onSavePhone (event) {
        if (event)
            event.preventDefault();

        //проверка полей
        if (this.state.phone.length === 10) {

            //запрос
            let result = await axios.post('/api/profile/setPhone', {
                phone: `7`+this.state.phone
            });

            result = result.data.response;

            if (result)
                this.props.set_phone(true);

            console.log(result)
        }
    }

    render() {
        return (
            <div className="container my-3">
                <div className="row">
                    <div className="col">
                        <h2 className="mb-3">Настройки</h2>

                        <div className="card">
                            <div className="card-header">
                                Изменение пароля
                            </div>
                            <div className="card-body">
                                {(this.state.err === 1) ?
                                    <div className="alert alert-warning" role="alert">
                                        {this.state.errText}
                                    </div> : null
                                }
                                {(this.state.err === 0) ?
                                    <div className="alert alert-success" role="alert">
                                        {this.state.errText}
                                    </div> : null
                                }

                                <form>
                                    <fieldset>
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text" role="img" aria-label="jsx-a11y/accessible-emoji">🔒</span>
                                            </div>
                                            <input type="password" className="form-control form-control-lg" name="password" placeholder="Пароль" minLength="5" required="" value={this.state.password} onChange={this.onChange}/>
                                        </div>
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text" role="img" aria-label="jsx-a11y/accessible-emoji">🔒</span>
                                            </div>
                                            <input type="password" className="form-control form-control-lg" name="password_replay" placeholder="Повторите пароль" minLength="8" required="" value={this.state.password_replay} onChange={this.onChange}/>
                                        </div>

                                    </fieldset>
                                </form>
                                <div className="text-right">
                                    <input type="submit" className="btn btn-primary" value="Сохранить" onClick={this.onSavePassword}/>
                                </div>
                            </div>
                        </div>
                        <div className="card mt-3">
                            <div className="card-header">
                                Телефон
                            </div>
                            <div className="card-body">
                                <p className="card-text">Для участия в партнерской программе, что позволит получать вознаграждения на счёт мобильного телефона, а так же восстановления доступа к учетной записи введите действующий номер мобильного телефона.</p>
                                <form onSubmit={this.onSavePhone}>
                                    <fieldset>
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text" role="img" aria-label="jsx-a11y/accessible-emoji">📞 +7</span>
                                            </div>
                                            <input type="tel" className="form-control form-control-lg" name="phone" placeholder="999 999 99 99" minLength="5" required="" value={this.state.phone} onChange={this.onChange} pattern="\d{10}"/>
                                        </div>

                                        <div className="text-right">
                                            <input type="submit" className="btn btn-primary" value="Сохранить"/>
                                        </div>
                                    </fieldset>
                                </form>
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
        set_phone: (has_phone) => {
            dispatch({type: 'SET_PHONE', has_phone: has_phone});
        }
    })
)(Settings);

