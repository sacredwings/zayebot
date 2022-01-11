import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import axios from "axios";

class WidgetTopMenu extends Component {
    constructor (props) {
        super(props);

        this.getUser = this.getUser.bind(this);
        this.logout = this.logout.bind(this);
    }

    componentDidMount() {
        this.getUser();
    }

    componentDidUpdate(prevProps) {
        // Выполнен вход
        if (!prevProps.myUser.auth && this.props.myUser.auth)
            this.getUser();
    }

    async getUser() {
        if (this.props.myUser.auth) return;

        try {
            let result = await axios.post('/api/profile/getUser');

            if (result.data && result.data.response) {
                let response = result.data.response;
                this.props.login(response.login, response.wallet, response.has_phone);
            }

        } catch (err) {
        }
    }

    logout(event) {
        event.preventDefault();
        this.props.logout();
        this.props.history.replace('/');
    }

    render() {
        let avatar = {
            height: '25px'
        };

        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
                <Link className="navbar-brand" to="/">ZayeBot</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {(this.props.myUser.auth) ?
                    <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/accounts">Аккаунты<span className="sr-only">(current)</span></Link>
                            </li>
                    </ul> : null}

                    {this.props.myUser.auth && !this.props.myUser.has_phone?
                    <div className="navbar-text mx-auto">Получай кэшбэк и зарабатывай на приглашениях. <Link to="/settings">Стать участником »</Link></div> : null}

                    {(this.props.myUser.auth) ?
                        <ul className={"navbar-nav" + (this.props.myUser.has_phone? ' ml-auto' : '')}>
                            <div className="navbar-text mr-3">
                                <div className="px-2 rounded" style={{background: this.props.myUser.wallet>0? '#f0fff0' : '#fff0f0', boxShadow: 'inset 0 0 2px #ddd'}}><strong><Link to="/history" title="История оплаты">{this.props.myUser.wallet}</Link></strong> zb&#162; <Link to="/wallet" title="Пополнить счёт">+</Link></div>
                            </div>

                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                                   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    {this.props.myUser.login}
                                </a>
                                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                    <Link className="dropdown-item" to="/settings">Настройки</Link>
                                    <Link className="dropdown-item" to="/wallet">Пополнить счёт</Link>
                                    <div className="dropdown-divider"/>
                                    <a className="dropdown-item" href="#" onClick={this.logout}>Выход</a>
                                </div>
                            </li>
                        </ul>
                        :
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">

                                <Link className="nav-link" to="/reg">Регистрация</Link>

                            </li>
                            <Link className="btn btn-primary" to='/auth'>Войти</Link>
                        </ul>
                    }
                </div>
            </nav>
        )
    }

}

export default connect (
    state => ({
        myUser: state.myUser,
    }),
    dispatch => ({
        login: (login, wallet, has_phone) => {
            dispatch({type: 'USER_LOGIN', login: login, wallet: wallet, has_phone: has_phone});
        },
        logout: () => {
            dispatch({type: 'USER_LOGOUT'});
        },
        wallet_update: (wallet) => {
            dispatch({type: 'WALLET_UPDATE', wallet: wallet});
        }
    })
)(withRouter(WidgetTopMenu));