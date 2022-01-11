import React, {Component} from 'react';
import {connect} from "react-redux";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import logo from '../logo.svg';

import 'bootstrap'; // подключаем бутстрап
import "bootstrap/dist/css/bootstrap.min.css";

//import Processes from "./system/Processes";
import TopMenu from "./elements/TopMenu";
import Footer from "./elements/Footer";
import Polite from "./elements/Polite";

import SocAccountsMain from "./pages/SocAccountsMain";
import PageWallet from "./pages/Wallet";
import PagePayments from "./pages/Payments";
import PageTransactions from "./pages/Transactions";
import Auth from "./pages/Auth";
import Reg from "./pages/Reg";
import Reset from "./pages/Reset";
import RegActive from "./pages/RegActive";
import ResetActive from "./pages/ResetActive";
import Landing from "./pages/Landing";
import Settings from "./pages/Settings";
import OAuthVK from "./pages/OAuthVK.js";


class App extends Component {
    constructor () {
        super();
    }

    //страницы с авторизацией
    pageAuth () {
        //массив
        let pages = [
            {path: '/accounts', component: SocAccountsMain},
            {path: '/wallet', component: PageWallet},
            {path: '/payments', component: PagePayments},
            {path: '/history', component: PageTransactions},
            {path: '/settings', component: Settings}
        ];
        //формирование
        pages = pages.map(function (page, i) {
            return <Route exact key={i} path={page.path} component={page.component} />
        });
        //вывод
        return pages
    }
    //страницы без авторизации
    pageNoAuth () {
        //массив
        let pages = [
            {path: '/auth', component: Auth},
            {path: '/reg', component: Reg},
            {path: '/reg-active/:code', component: RegActive},
            {path: '/reset', component: Reset},
            {path: '/reset-active/:code', component: ResetActive},
            {path: '/ref/:ref', component: Landing},
            {path: '/oauth-vk', component: OAuthVK},
        ];
        //формирование
        pages = pages.map(function (page, i) {
            return <Route key={i} path={page.path} component={page.component} />
        });
        //вывод
        return pages
    }

    render() {
        let auth = this.props.myUser.auth;
        return (
            <>
                <Router>
                    <Polite/>
                    <TopMenu/>
                    <div className="wrapper">
                    <Route exact path="/" component={Landing} />
                    {(auth) ? this.pageAuth() : this.pageNoAuth()}
                    </div>
                    <Footer/>
                </Router>
            </>
        )};
}

export default connect (
    state => ({
        myUser: state.myUser,
    })
)(App);
