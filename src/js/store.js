//СОСТОЯНИЕ ПРИЛОЖЕНИЯ
import { createStore, combineReducers } from 'redux';
import cookie from './utils/cookie';

//Состояние приложения
const stateApp = {

};

function app (state = stateApp, action) {

    //Обязан вернуть состояние
    return state;
}

//Активный пользователь
const stateMyUser = {
    auth: false,
    has_phone: false,
    login: 'unknown',
    tokenId: null,
    tokenKey: null,
    wallet: 0
};

function myUser (state = stateMyUser, action) {
    switch (action.type) {

        /*
        case '@@INIT':
            if (cookie.get('tid') && cookie.get('token') && ((cookie.get('tid') !== 'undefined') && (cookie.get('token') !== 'undefined')))
                return {
                    ...state,
                    auth: true
                };
            return state;
        */

        case 'AUTH':
            cookie.set('tid=' + action.tokenId, !action.remember);
            cookie.set('token=' + action.tokenKey, !action.remember);

            return {
                ...state,
                auth: true,
                login: action.login,
                tokenId: action.tokenId,
                tokenKey: action.tokenKey
            };

        case 'USER_LOGIN':
            return {
                ...state,
                auth: true,
                login: action.login,
                has_phone: action.has_phone,
                wallet: action.wallet || 0
            };

        case 'SET_PHONE':
            return {
                ...state,
                has_phone: action.has_phone
            };

        case 'USER_LOGOUT':
            cookie.clear('tid');
            cookie.clear('token');

            return {
                ...state,
                tokenId: null,
                tokenKey: null,
                has_phone: false,
                auth: false,
            };

        case 'WALLET_UPDATE':
            return {
                ...state,
                wallet: action.wallet
            };

        default:
            return state;
    }
}

//аккаунты пользователя
const stateAccounts = {
    vk: []
};

function accounts (state = stateAccounts, action) {
    switch (action.type) {

        case 'ACCOUNTS':
            return {
                ...state,
                vk: action.list.vk
            };

        default:
            return state;
    }
}

/*
//аккаунты пользователя
const stateSelectAccount = {
    account: null
};
function selectAccount (state = stateSelectAccount, action) {
    switch (action.type) {

        case 'SELECT_ACCOUNT':
            return {
                ...state,
                account: action.account
            };


        default:
            return state;
    }
}
*/
const reducers = combineReducers({app, myUser, accounts});
const store = createStore( reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() );

export default store;