import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from "axios";
import $ from 'jquery';

//https://oauth.vk.com/token?grant_type=password&client_id=2274003&client_secret=hHbZxrka2uZ6jB1inYsH&username=%D0%9B%D0%9E%D0%93%D0%98%D0%9D&password=%D0%9F%D0%90%D0%A0%D0%9E%D0%9B%D0%AC&captcha_key=q24yud&captcha_sid=656412648896
//класс для работы с аккаунтами
class SocAccountsList extends Component {
    constructor () {
        super();
        this.state = {
            formAddLogin: '',
            formAddPassword: '',
            formAddCode: '',
            formAddCodeShow: false,
            formInfo: '',
            formAlertClass: '',

            //еще не использовано
            formAddCaptchaSid: null,
            formAddCaptchaKey: '',
        };

        this.onChangeFormAddAccount = this.onChangeFormAddAccount.bind(this);
        this.onClickAddAccount = this.onClickAddAccount.bind(this);

        this.onClickSelectAccount = this.onClickSelectAccount.bind(this);

    }

    //при загрузке страницы
    async componentDidMount() {

        //загрузка аккаунтов из базы
        let arAccounts = await axios.post('/api/account/get');
        if ((!arAccounts.data) || (!arAccounts.data.response))
            return;

        let list = {
            vk: arAccounts.data.response
        };

        //сохранение аккаунтов в STORE
        this.props.arAccounts(list);
    }


    async onClickAddAccount (event) {
        //проверка длины полей
        if ((this.state.formAddLogin.length >= 5) && (this.state.formAddPassword.length >= 8)) {

            //формирование полей для запроса
            let data = {
                login: this.state.formAddLogin,
                password: this.state.formAddPassword
            };

            if (this.state.formAddCodeShow)
                data.code = this.state.formAddCode;

            //если сервер требует код / добавляем код к запросу
            //if ((this.state.formErr === 200010005) || (this.state.formErr === 200010008))
                //data.code = this.state.formAddCode;

            //добавляем аккаунт в базу
            let result = await axios.post('/api/account/add', data);
            result = result.data;

            if (result.err) {

                if (result.err === 200010005)
                    this.setState({formAddCodeShow: true, formAlertClass: 'alert alert-warning', formInfo: result.msg});

                if (result.err === 200010008)
                    this.setState({formAddCodeShow: true, formAlertClass: 'alert alert-danger', formInfo: result.msg});

                if (result.err === 200010006)
                    this.setState({formAddCodeShow: false, formAlertClass: 'alert alert-warning', formInfo: result.msg});

                if (result.err === 200010007)
                    this.setState({formAddCodeShow: false, formAlertClass: 'alert alert-warning', formInfo: result.msg});

                console.log('no error')
            } else {

                console.log('error')
                this.setState({formAddCodeShow: false, formAlertClass: '', formInfo: ''});

                //обнуление состояния ошибки формы / закрытие модульного окна
                this.setState({formErr: null});
                $('#modalAccountAdd').modal('hide');

                //обновление списка контактов
                this.componentDidMount();
            }

            /*
            //сохранение ошибки в состояние формы
            if ((result.data) && (result.data.err !== 0)) {
                this.setState({formErr: result.data.err});

                //выход не закрывая модульного окна
                return;
            }*/




        } else {
            this.setState({formAddCodeShow: false, formAlertClass: 'alert alert-warning', formInfo: 'Поля заполнены не верно'});
        }

    }

    //изменение полей формы добаления аккаунта
    onChangeFormAddAccount (event) {

        //длина полей ограничена 30 символами
        if (event.target.value.length <= 30) {
            const name = event.target.name; //имя изменяемого объекта
            this.setState({[name]: event.target.value}); //меняем состояние объекта
        }

        this.setState({formAlertClass: '', formInfo: ''});
    }

    //изменение выбранного аккаунта
    onClickSelectAccount (account, e) {
        this.props.onClickSelectAccount(account)
    }

    //отрисовка массива аккаунтов
    accounts () {
        let styleImg = {height: '60px'};
        let _this = this;
        if (this.props.accounts.vk.length) {
            return (
                <div className="list-group">
                    {this.props.accounts.vk.map(function (item, i) {
                        return (
                            <a href="#" key={i} onClick={_this.onClickSelectAccount.bind(this, item)}
                               className="list-group-item list-group-item-action flex-column align-items-start">
                                <div className="row">
                                    <div className="col-sm-4">
                                        <img style={styleImg} src={item.img_ava}/>
                                    </div>
                                    <div className="col-sm-8">
                                        <div className="d-flex w-100 justify-content-between">
                                            <h5 className="mb-1">{item.first_name}</h5>
                                            <small>VK</small>
                                        </div>
                                        <p className="mb-1">{item.last_name}</p>
                                        <small>...</small>
                                    </div>
                                </div>
                            </a>
                        )
                    })}
                </div>
            )
        }
    }

    //отрисовка массива аккаунтов и модульного окна для добавления
    render() {
        console.log('SocAccountsList-render');
        return (
            <>
                <button type="button" className="btn btn-primary btn-block mb-3" data-toggle="modal" data-target="#modalAccountAdd">+ добавить аккаунт</button>
                {this.accounts()}
                <div className="modal fade" id="modalAccountAdd" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalCenterTitle">+ Добавь аккаунт ВКонтакте</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <fieldset>
                                        {(this.state.formInfo) ?
                                            <div className={this.state.formAlertClass} role="alert">
                                                {this.state.formInfo}
                                            </div> : null}

                                        <div className="form-group">
                                            <label htmlFor="formAddLogin">Введите логин и пароль от аккаунта ВКонтакте</label>
                                            <div className="input-group mb-3">

                                                <div className="input-group-prepend">
                                                    <span className="input-group-text" role="img" aria-label="jsx-a11y/accessible-emoji">👨</span>
                                                </div>
                                                <input type="text" className="form-control form-control-lg" name="formAddLogin" id="formAddLogin" placeholder="номер телефона или email от vk" minLength="5" required="" value={this.state.formAddLogin} onChange={this.onChangeFormAddAccount}/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text" role="img" aria-label="jsx-a11y/accessible-emoji">🔒</span>
                                                </div>
                                                <input type="password" className="form-control form-control-lg" name="formAddPassword" placeholder="пароль от вк" minLength="8" required="" value={this.state.formAddPassword} onChange={this.onChangeFormAddAccount} autoComplete="new-password"/>
                                            </div>
                                        </div>
                                        {(this.state.formAddCodeShow) ?
                                            <div className="form-group">
                                                <label htmlFor="formAddLogin">Введите код отпраленный в СМС</label>
                                                <div className="input-group mb-3">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text" role="img" aria-label="jsx-a11y/accessible-emoji">🔒</span>
                                                    </div>
                                                    <input type="text" className="form-control form-control-lg" name="formAddCode" placeholder="Код" minLength="8" maxLength="8" required="" value={this.state.formAddCode} onChange={this.onChangeFormAddAccount}/>
                                                </div>
                                            </div> : null}
                                    </fieldset>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Закрыть</button>
                                <button type="button" className="btn btn-primary" onClick={this.onClickAddAccount}>Добавить</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

}

export default connect (
    state => ({
        accounts: state.accounts,
    }),
    dispatch => ({
        arAccounts: (list) => {
            dispatch({type: 'ACCOUNTS', list: list});
        }
    })
)(SocAccountsList);

