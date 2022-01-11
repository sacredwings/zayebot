import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

//https://oauth.vk.com/token?grant_type=password&client_id=2274003&client_secret=hHbZxrka2uZ6jB1inYsH&username=%D0%9B%D0%9E%D0%93%D0%98%D0%9D&password=%D0%9F%D0%90%D0%A0%D0%9E%D0%9B%D0%AC&captcha_key=q24yud&captcha_sid=656412648896
class Reset extends Component {
    constructor () {
        super();
        this.state = {
            email: '',
            alertClass: '',
            info: ''
        };

        this.onChange = this.onChange.bind(this);
        this.onClickReset = this.onClickReset.bind(this);

    }

    async onClickReset (event) {

        //проверка полей
        if ((this.state.email.length > 5) && (/.+@.+\..+/i.test(this.state.email))) {

            //запрос
            let result = await axios.post('/api/profile/reset', {
                email: this.state.email,
            });

            result = result.data;

            if (!result.err) {
                this.setState({alertClass: 'alert alert-success', info: `На адрес ${this.state.email}, отправлены инструкции для востановления доступа `})
            } else {
                this.setState({alertClass: 'alert alert-warning', info: result.msg})
            }

        } else {
            this.setState({alertClass: 'alert alert-warning', info: `Введите корректный Email`})
        }

    }

    onChange (event) {
        if (event.target.value.length <= 100) {
            const name = event.target.name;
            this.setState({[name]: event.target.value});

            //при изменении почты, сбрасываем ошибку
            this.setState({info: null})
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="card card-block login-block shadow my-3 mx-auto">
                        <div className="card-header">
                            Востановление пароля
                        </div>
                        <div className="card-body">
                            {(this.state.info) ?
                                <div className={this.state.alertClass} role="alert">
                                    {this.state.info}
                                </div> : null}

                                <p>Забыл пароль?</p>
                            <p>Введите Email который указывали при регистрации</p>
                            <form>
                                <fieldset>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" role="img" aria-label="jsx-a11y/accessible-emoji">📧</span>
                                        </div>
                                        <input type="text" className="form-control form-control-lg" name="email" placeholder="Email" minLength="5" required="" value={this.state.email} onChange={this.onChange}/>
                                    </div>
                                </fieldset>
                            </form>
                            <div className="text-right">
                                <input type="submit" className="btn btn-primary" value="Отправить код" onClick={this.onClickReset}/>
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
)(Reset);

