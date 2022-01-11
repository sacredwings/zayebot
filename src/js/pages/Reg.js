import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

//https://oauth.vk.com/token?grant_type=password&client_id=2274003&client_secret=hHbZxrka2uZ6jB1inYsH&username=%D0%9B%D0%9E%D0%93%D0%98%D0%9D&password=%D0%9F%D0%90%D0%A0%D0%9E%D0%9B%D0%AC&captcha_key=q24yud&captcha_sid=656412648896
class Reg extends Component {
    constructor () {
        super();
        this.state = {
            first_name: '',
            email: '',
            password: '',
            alertClass: '',
            info: ''
        };

        this.onChange = this.onChange.bind(this);
        this.onClickReg = this.onClickReg.bind(this);
    }

    async onClickReg (event) {
        //проверка полей
        if ((this.state.first_name.length >= 3) && (this.state.email.length >= 8) && (this.state.password.length >= 8)) {

            //запрос
            let result = await axios.post('/api/profile/reg', {
                first_name: this.state.first_name,
                email: this.state.email,
                password: this.state.password
            });

            result = result.data;


            //ответ со всеми значениями
            if (!result.err) {
                this.setState({alertClass: 'alert alert-success', info: `На вашу почту ${this.state.email} отправлено сообщение с кодом подтверждения регистрации.`});
            } else {
                this.setState({alertClass: 'alert alert-warning', info: result.msg});
            }

        } else
            this.setState({alertClass: 'alert alert-warning', info: `Поля заполнены не верно`})

    }

    onChange (event) {
        if (event.target.value.length <= 30) {
            const name = event.target.name;
            this.setState({[name]: event.target.value});
        }
    }

    render() {
        let styleIco = {
            height: '40px'
        }
        return (

            <div className="container">
                <div className="row">
                    <div className="card card-block login-block shadow my-3 mx-auto">
                        <div className="card-header">
                            Зарегистрироваться
                        </div>
                        <div className="card-body">
                            <form>
                                <fieldset>
                                    {(this.state.info) ?
                                        <div className={this.state.alertClass} role="alert">
                                            {this.state.info}
                                        </div> : null}

                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" role="img" aria-label="jsx-a11y/accessible-emoji">👨</span>
                                        </div>
                                        <input type="text" className="form-control form-control-lg" name="first_name" placeholder="Введите ваше имя" minLength="3" required="" value={this.state.first_name} onChange={this.onChange}/>
                                    </div>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" role="img" aria-label="jsx-a11y/accessible-emoji">📧</span>
                                        </div>
                                        <input type="text" className="form-control form-control-lg" name="email" placeholder="Введите ваш е-mail" minLength="8" required="" value={this.state.email} onChange={this.onChange}/>
                                    </div>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" role="img" aria-label="jsx-a11y/accessible-emoji">🔒</span>
                                        </div>
                                        <input type="password" className="form-control form-control-lg" name="password" placeholder="Придумайте пароль" minLength="8" required="" value={this.state.password} onChange={this.onChange} autoComplete="new-password"/>
                                    </div>
                                </fieldset>
                            </form>
                            <div className="text-right">
                                <input type="submit" className="btn btn-primary" value="Зарегистрироваться" onClick={this.onClickReg}/>
                            </div>
                            <hr/>
                            <div>
                                <p className="mb-2">Регистрация через ВК</p>
                                <div><a href="https://oauth.vk.com/authorize?client_id=7407409&display=page&redirect_uri=https://zayebot.voenset.ru/oauth-vk&scope=email&response_type=code&v=5.103"><img style={styleIco} src="soc_ico/vk.svg"/></a></div>
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

