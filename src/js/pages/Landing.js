import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {Link} from "react-router-dom";
import cookie from '../utils/cookie';
import YandexShare from '../elements/YandexShare';


class Landing extends Component {
    constructor () {
        super();

    }

    async componentDidMount () {
        if (this.props.match.params.ref)
            cookie.set('ref=' + this.props.match.params.ref, false);
    }

    render() {
        return (
            <div className="landing">
                <div id="height">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 ">
                                <br/>
                                <br/>
                                <h1 className="text-center">Я ZayeBot, и я отлайкаю всех кто тебе интересен, чтобы тебя заметили</h1>
                                <br/>
                                <br/>

                                <div className="row">
                                    <div className="col-lg-8">
                                        <h2>Повышай внимание к своей странице вконтакте до 300% и продавай больше услуг и товаров.</h2>
                                        <br/>

                                        <p><b>Вы постоянно находитесь на виду у своих друзей</b></p>
                                        <p><b>Вы привлекаете новых людей к себе на профиль</b></p>
                                        <p><b>Вы повышаете статистику и охваты своего профиля</b></p>
                                    </div>
                                    <div className="col-lg-4">
                                        <img src="/landing/ZayeBot.png"/>
                                    </div>
                                </div>

                                <br/>
                                <br/>
                                <div className="text-center">
                                    <Link className="btn btn-primary shadow my-4 mx-auto" to={(this.props.myUser.auth) ? '/accounts' : '/auth'}>Начать сейчас</Link>

                                </div>
                                <div className="text-center">
                                    Поделиться в <YandexShare />
                                </div>
                                <br/>
                                <br/>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="who" className="container">
                    <h2>Кому подойдёт этот сервис</h2>
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="card">
                                <img src="/landing/blog.svg"/>
                                <div className="card-body">
                                    <h3>- блогерам</h3>
                                    ZayeBot поможем вам повысить посещаемость своей страницы. Вы будете получать больше лайков, больше внимания, больше аудитории.
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="card">
                                <img src="/landing/business.svg"/>
                                <div className="card-body">
                                    <h3>- предпринимателям</h3>
                                    Вы можете создать рабочую страницу для своего бизнеса и добавлять свою целевую аудиторию в друзья. ZayeBot будет регулярно привлекать их внимание. Ваши потенциальные клиенты будут регулярно посещать вашу страницу, что поднимет продажи!
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="card">
                                <img src="/landing/freelanc.svg"/>
                                <div className="card-body">
                                    <h3>- фрилансерам</h3>
                                    У вас в друзьях много ваших клиентов? Как часто они вспоминают о вас и ваших услугам? Благодаря ZayeBot(у) они будут делать это каждый день. В тот момент, когда им нужны будете вы, вы будете первым, кто придет им на ум.
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="card">
                                <img src="/landing/smm.svg"/>
                                <div className="card-body">
                                    <h3>- smm-щикам</h3>
                                    У вас есть клиенты, которым вы помогаете раскручивать их бренд вконтакте? Теперь вы можете дать им еще один полезный инстурмент, который повысить эффективность их соц. сетей и получать с этого дополнительный доход через партнерскую программу.
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-center">
                        <Link className="btn btn-primary shadow my-4 mx-auto" to={(this.props.myUser.auth) ? '/accounts' : '/auth'}>Начать сейчас</Link>
                    </div>
                    <div className="text-center">
                        Поделиться в <YandexShare />
                    </div>
                    <br/>
                    <br/>
                </div>
                <div id="FAQ">
                    <div className="container">
                        <h2>FAQ</h2>
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="card">
                                    <div className="card-body">
                                        <h3>- это безопасно для моей страницы?</h3>
                                        - да! Мы используем выделенные айпи, которые позволяют не выходить за лимиты вконтакте и сохранять свою страницу в полной безопасности.
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="card">
                                    <div className="card-body">
                                        <h3>- не выглядит это как спам?</h3>
                                        - ZayeBot имеет удобные системы настройки, которые позволяют создать эффект реальности. Вы можете настроить ZayeBot таким образом, что никто вас даже не заподозрит в использование какого-то сервиса.
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="card">
                                    <div className="card-body">
                                        <h3>- почему это повышает эффективность моей страницы?</h3>
                                        - люди любят внимание. Когда они видят, что вы каждый день ставите им лайки на их посты, смотрите их сторисы и многое другое, то они начинают обращать внимание и на вас. Вы отдаете свое внимание , чтобы они отдали свое.
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="card">
                                    <div className="card-body">
                                        <h3>- мне нужно будет подключать дополнительные сервисы? Антикапчу?</h3>
                                        - нет! Мы позаботились о вас и подключили все за вас. У нас есть сервисы, которые на автомате обрабатывают вам всю капчу.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-center">
                        <Link className="btn btn-primary shadow my-4 mx-auto" to={(this.props.myUser.auth) ? '/accounts' : '/auth'}>Начать сейчас</Link>
                    </div>
                    <div className="text-center">
                        Поделиться в <YandexShare />
                    </div>
                    <br/>
                    <br/>
                </div>
                <div id="price">
                    <div className="container">
                        <h2>Цена</h2>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="card">
                                    <div className="card-body">
                                        <h3 className="text-center">От 1 рубля за модуль необходимый модуль</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-center">
                        <Link className="btn btn-primary shadow my-4 mx-auto" to={(this.props.myUser.auth) ? '/accounts' : '/auth'}>Начать сейчас</Link>
                    </div>
                    <div className="text-center">
                        Поделиться в <YandexShare />
                    </div>
                    <br/>
                    <br/>
                </div>

            </div>
        )
    }

}

export default connect (
    state => ({
        myUser: state.myUser,
    }),
    dispatch => ({
        Store_myUser: (login, tokenId, tokenKey, remember) => {
            dispatch({type: 'AUTH', login: login, tokenId: tokenId, tokenKey: tokenKey, remember: remember});
        }
    })
)(Landing);

