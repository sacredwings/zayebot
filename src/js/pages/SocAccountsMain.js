import React, {Component} from 'react';
import {connect} from 'react-redux';
import SocAccountsList from './SocAccountsList';
import SocAccountSetting from './SocAccountSetting';

class SocAccountsMain extends Component {
    constructor () {
        super();

        this.state = {
            //выделенный аккаунт
            account: null
        };

        this.onClickSelectAccount = this.onClickSelectAccount.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onChangeChecked = this.onChangeChecked.bind(this);
    }

    //выбор аккаунта уже из загруженного массива / проброшено на страницу массива аккаунтов
    onClickSelectAccount (account) {
        //сохранение выбранного аккаунта из массива
        this.setState({account: account})
    }

    //изменение состояния выбранного аккаунта / проброшено на страницу настройки аккаунтов
    onChangeChecked (name, checked) {

        //берем текущий аккаунт
        let account = this.state.account;
        //изменяем параметр в массиве
        //account.likes[i][name] = checked;

        //обновление массива - обязательно через функцию / чтобы состояние увидело изменения
        this.setState(prevState => ({
            account: {
                ...prevState.account,
                [name]: checked
            }
        }))
    }

    //изменение состояния выбранного аккаунта / проброшено на страницу настройки аккаунтов
    onChange (name, value) {

        //обновление массива - обязательно через функцию / чтобы состояние увидело изменения
        this.setState(prevState => ({
            account: {
                ...prevState.account,
                [name]: value
            }
        }));
    }

    //отрисовка массива аккаунтов и их настроек
    render() {
        console.log('SocAccountsMain-render');
        return (
            <div className="container my-3">
                <div className="row">
                    <div className="col-lg-3">
                        <SocAccountsList onClickSelectAccount={this.onClickSelectAccount}/>
                    </div>
                    <div className="col-lg-9">
                        <SocAccountSetting onChangeChecked={this.onChangeChecked} onChange={this.onChange} account={this.state.account}/>
                    </div>
                </div>
            </div>
        )
    }

}

export default connect (
)(SocAccountsMain);

