import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from "axios";
import requestsVk from '../system/requests/vk';

class SocAccountSetting extends Component {
    constructor () {
        super();

        this.state = {
            tariff: 1,
            month: 1,
            sumTariff: [300, 600],
            sumMonth: [0, 50, 100],

            result: 0,

            chatInfo: '',
            chatErr: null,
            chatCount: 0
        };


        this.onSaveFriends = this.onSaveFriends.bind(this);
        this.onSaveLikes = this.onSaveLikes.bind(this);
        this.onSaveBirthday = this.onSaveBirthday.bind(this);
        //this.onDeleteAccount = this.onDeleteAccount.bind(this);


        this.onAddBirthday = this.onAddBirthday.bind(this);
        this.onDeleteBirthday = this.onDeleteBirthday.bind(this);

        this.onChange = this.onChange.bind(this);
        this.onChangeChecked = this.onChangeChecked.bind(this);

        this.formPayTariff = this.formPayTariff.bind(this);
        this.formPayMonth = this.formPayMonth.bind(this);

        this.onPay = this.onPay.bind(this);

        this.onChatPost = this.onChatPost.bind(this);


    }

    componentDidUpdate() {
        console.log('SocAccountSetting-componentDidUpdate')
    }

    onAddBirthday() {
        this.props.onChange('birthday_sentence',
            [...this.props.account.birthday_sentence, '']);
    }

    onDeleteBirthday(obj) {
        this.props.account.birthday_sentence.splice(obj.currentTarget.dataset.idx, 1);
        this.props.onChange('birthday_sentence', this.props.account.birthday_sentence);
    }

    async onSaveLikes (event) {

        let config = this.props.account;
        console.log(config)
        let data = {
            account_id: config.id,

            allowed: +config.likes_allowed,
            source_ids_friends: +config.likes_source_ids_friends,
            source_ids_groups: +config.likes_source_ids_groups,
            source_ids_pages: +config.likes_source_ids_pages,
            source_ids_following: +config.likes_source_ids_following,
            filters_post: +config.likes_filters_post,
            filters_photo: +config.likes_filters_photo,
            repost: +config.likes_repost,

            vk_post_allowed: +config.likes_vk_post_allowed,
            vk_post_people: +config.likes_vk_post_people,
            vk_post_groups: +config.likes_vk_post_groups,

            vk_friend_allowed: +config.likes_vk_friend_allowed,
            vk_friend_people: +config.likes_vk_friend_people,
            vk_friend_groups: +config.likes_vk_friend_groups,

            black_list: config.likes_black_list.split('\n'),
            stop_words: config.likes_stop_words.split('\n')
        };

        //????????????
        let result = await axios.post('/api/like/edit', data);
        console.log(result);
        if ((result.data) && (result.data.err !== 0)) {
            return;
        }
    }

    async onSaveFriends () {

        let config = this.props.account;

        let data = {
            account_id: config.id,
            allowed: +config.friends_allowed,
            age_use: +config.friends_age_use,
            age_from: config.friends_age_from,
            age_to: config.friends_age_to,
            sex: config.friends_sex,
            message: config.friends_message,
            message_subscriber: config.friends_message_subscriber
        };

        //????????????
        let result = await axios.post('/api/friend/edit', data);
        console.log(result);
        if ((result.data) && (result.data.err !== 0)) {
            return;
        }
    }
    async onSaveBirthday () {

        let config = this.props.account;

        let data = {
            account_id: config.id,
            allowed: +config.birthday_allowed,
            sentence: config.birthday_sentence,
        };

        //????????????
        let result = await axios.post('/api/friend/editBirthday', data);
        console.log(result);
        if ((result.data) && (result.data.err !== 0)) {
            return;
        }
    }


    async onDeleteAccount (id, event) {
        let data = {
            id: id,
        };


        //????????????
        let result = await axios.post('/api/account/delete', data);
        console.log(result);
        if ((result.data) && (result.data.err === 0)) {
            window.location.reload();
        }
    }

    async onPay () {

        let config = this.props.account;

        let data = {
            account_id: config.id,
            tariff: this.state.tariff,
            month: this.state.month
        };

        //????????????
        let result = await axios.post('/api/pay/add', data);
        console.log(result);
        if ((result.data) && (result.data.err === 0)) {

        }
    }
    //?????????????????? ?????????????? ????????????????
    viewAccountInfo (account) {
        //<li className="list-group-item">???????????? ???? ???????? <span className="badge badge-success">{account.likes_counts_day}</span></li>
        return (
            <div className="col-lg-4">
                <div className="card">
                    <img className="card-img-top" src={account.img} alt="Card image cap"/>
                    <div className="card-body">
                        <h5 className="card-title">{account.first_name}</h5>
                        <p className="card-text">{account.last_name}</p>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item d-flex justify-content-between align-items-center">???????????? ???? ???????? <span className="badge badge-success">{account.likes_counts_day}</span></li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">???????????? ???? ?????? ?????????? <span className="badge badge-success">{account.likes_counts_total}</span></li>
                    </ul>
                    <div className="card-body">
                        <a href={`https://vk.com/id${account.soc_user_id}`} className="card-link">?????????????? ?? ??????????????</a>
                    </div>
                    <a href={'https://money.yandex.ru/to/410018702407689'} type="button" className="btn btn-primary">???????????????????? ????????????</a>
                    <button type="button" className="btn btn-warning" onClick={this.onDeleteAccount.bind(this, account.id)}>?????????????? ???? ????????</button>

                </div>
            </div>
        )
        //<button type="button" className="btn btn-primary" data-toggle="modal" data-target="#modalAccountPay">???????????????????? ????????????</button>
    }
    formPayTariff(event) {
        this.setState({tariff: event.target.value});
    }

    formPayMonth(event) {
        this.setState({month: event.target.value});
    }
    //???????? ???????????? ????????????????
    modalPay (account) {
        return (

            <div className="modal fade" id="modalAccountPay" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalCenterTitle">???????????????????? ????????????</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <h5 className="card-title">????????????: {account.first_name} {account.last_name}</h5>
                            <div className="form-group">
                                <label htmlFor="tariff">??????????</label>
                                <select className="form-control" id="tariff" value={this.state.tariff} onChange={this.formPayTariff}>
                                    <option value="1">?????????????????????? - ???????? ????????</option>
                                    <option value="2">???????????????????????? - ???????????? ????????????????????</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="month">???? ?????????? ??????????</label>
                                <select className="form-control" id="month" value={this.state.month} onChange={this.formPayMonth}>
                                    <option value="1">1 ??????????</option>
                                    <option value="2">2 ????????????</option>
                                    <option value="3">3 ????????????</option>
                                </select>
                            </div>
                            <hr/>
                            <p><b>??????????: </b>
                                <span className="badge badge-success">{this.state.sumTariff[this.state.tariff-1] * this.state.month - this.state.sumMonth[this.state.month-1] * this.state.tariff} ??????.</span>
                                &nbsp;????????????:&nbsp;
                                <span className="badge badge-warning">{this.state.sumMonth[this.state.month-1] * this.state.tariff} ??????.</span>
                            </p>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">??????????????</button>
                            <button type="button" className="btn btn-primary" onClick={this.onPay}>???????????????????? ????????????</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    onChange (event) {
        try {
            let name = event.target.name;
            let value = event.target.value;

            //????????????????????????????
            //???????????????????????? ??????????????
            if (name === 'friends_age_use')
                value = Number (value);

            //???????? ?????????? ???????????????? / ???? ?????????????????????????? - ???? ??????????????????
            if ((name === 'friends_age_from') || (name === 'friends_age_to')) {
                if (!/^\d+$/.test(value)) return;

                value = Number (value);
                if (Number (value) > 100) return;
            }

            if (name === 'friends_allowed')
                value = event.target.checked;

            //???????? ??????
            if (((name === 'chat_like_id') || (name === 'chat_like_count')) && (!/^\d+$/.test(value))) {
                value = 1;
                return;
            }

            if ((name === 'chat_like_count') && (Number (value) > 100))
                return;

            //?????????????? ???????? ???? ??????????, ?????? ?????????? ?????? ???????????????????? /???????????????? ??????????????????????
            if (((name === 'chat_like_id') || (name === 'chat_like_count') || (name === 'chat_like_message')) && (this.state.chatCount===0))
                this.setState({chatInfo: ``, chatErr: null})

            //???????????????? ???????? /???? ???????????? ????????
            if (((name === 'chat_like_id') || (name === 'chat_like_count') || (name === 'chat_like_message')) && (this.state.chatCount>0))
                return;

            if (name === 'birthday_sentence') {
                let index = event.target.dataset.idx;

                this.props.account.birthday_sentence[index] = value;
                value = this.props.account.birthday_sentence;
            }

            //?????????????????? ???? Profiles.js
            this.props.onChange(name, value)
        } catch (e) {
            console.log(e)
        }

    }
    onChangeChecked (event) {
        console.log(event)

        const name = event.target.id;
        const checked = event.target.checked;

        console.log(name)
        console.log(checked)

        //?????????????????? ???? Profiles.js
        this.props.onChangeChecked(name, checked)
    }

    viewLikesSettings (account) {
        return (

            <div className="card">
                <div className="card-header">
                    ???????? ????????
                </div>

                <div className="card-body">
                    <form>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="row">
                                    <div className="col-lg-12">

                                        {/* ?????????????????? ???????????? ???????????? */}
                                        <div className="d-flex justify-content-between">
                                         <div>
                                          <div className="custom-control custom-switch">
                                            <input type="checkbox" className="custom-control-input" id="likes_allowed" checked={account.likes_allowed} onChange={this.onChangeChecked}/>
                                            <label className="custom-control-label" htmlFor="likes_allowed"> <b>??????/???????? | ?????? ???????????? ????????????</b></label>
                                          </div>
                                         </div>
                                         <div><span className="text-success"><strong>1</strong> zb&#162;</span><sub>/????????</sub></div>
                                        </div>
                                    </div>
                                </div>
                                <fieldset style={{display: (account.likes_allowed)? '' : 'none' }}>
                                <div className="row mt-2">
                                    <div className="col-lg-6">

                                        <small className="form-text text-muted">?????? ?????????????? ?</small>
                                        <div className="form-group form-check">
                                            <input type="checkbox" className="form-check-input" id="likes_filters_post" checked={account.likes_filters_post} onChange={this.onChangeChecked}/>
                                            <label className="form-check-label" htmlFor="likes_filters_post">??????????</label>
                                        </div>
                                        <div className="form-group form-check">
                                            <input type="checkbox" className="form-check-input" id="likes_filters_photo" checked={account.likes_filters_photo} onChange={this.onChangeChecked}/>
                                            <label className="form-check-label" htmlFor="likes_filters_photo">????????</label>
                                        </div>
                                        <div className="form-group form-check">
                                            <input type="checkbox" className="form-check-input" id="likes_repost" checked={account.likes_repost} onChange={this.onChangeChecked}/>
                                            <label className="form-check-label" htmlFor="likes_repost">??????????????</label>
                                        </div>

                                    </div>
                                    <div className="col-lg-6">

                                        <small className="form-text text-muted">???????? ?????????????? ?</small>
                                        <div className="form-group form-check">
                                            <input type="checkbox" className="form-check-input" id="likes_source_ids_friends" checked={account.likes_source_ids_friends} onChange={this.onChangeChecked}/>
                                            <label className="form-check-label" htmlFor="likes_source_ids_friends">????????????</label>
                                        </div>
                                        <div className="form-group form-check">
                                            <input type="checkbox" className="form-check-input" id="likes_source_ids_groups" checked={account.likes_source_ids_groups} onChange={this.onChangeChecked}/>
                                            <label className="form-check-label" htmlFor="likes_source_ids_groups">????????????</label>
                                        </div>
                                        <div className="form-group form-check">
                                            <input type="checkbox" className="form-check-input" id="likes_source_ids_pages" checked={account.likes_source_ids_pages} onChange={this.onChangeChecked}/>
                                            <label className="form-check-label" htmlFor="likes_source_ids_pages">????????????????</label>
                                        </div>
                                        <div className="form-group form-check">
                                            <input type="checkbox" className="form-check-input" id="likes_source_ids_following" checked={account.likes_source_ids_following} onChange={this.onChangeChecked}/>
                                            <label className="form-check-label" htmlFor="likes_source_ids_following">????????????????(??)</label>
                                        </div>

                                    </div>
                                </div>
                                </fieldset>
                            </div>
                        </div>
                        <hr/>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="row">
                                    <div className="col-lg-12">

                                        {/* ?????????????????? ???????????? ???????????? */}
                                        <div className="d-flex justify-content-between">
                                         <div>
                                          <div className="custom-control custom-switch">
                                            <input type="checkbox" className="custom-control-input" id="likes_vk_post_allowed" checked={account.likes_vk_post_allowed} onChange={this.onChangeChecked}/>
                                            <label className="custom-control-label" htmlFor="likes_vk_post_allowed"> <b>??????/???????? | ?????????????????????????????? ??????????</b></label>
                                          </div>
                                         </div>
                                         <div><span className="text-success"><strong>3</strong> zb&#162;</span><sub>/????????</sub></div>
                                        </div>

                                    </div>
                                </div>
                                <fieldset style={{display: (account.likes_vk_post_allowed)? '' : 'none' }}>
                                <div className="row mt-2">
                                    <div className="col-lg-6">
                                        <small className="form-text text-muted">?????? ?????????????? ?</small>
                                        <div className="form-group form-check">
                                            <input type="checkbox" className="form-check-input" id="likes_vk_post_post" checked readOnly/>
                                            <label className="form-check-label" htmlFor="likes_vk_post_post">??????????</label>
                                            <small className="form-text text-muted">???????????? ??????????, ???????????????? ???? ??????????????????????</small>
                                        </div>

                                    </div>
                                    <div className="col-lg-6">
                                        <small className="form-text text-muted">???????? ?????????????? ?</small>

                                        <div className="form-group form-check">
                                            <input type="checkbox" className="form-check-input" id="likes_vk_post_people" checked={account.likes_vk_post_people} onChange={this.onChangeChecked}/>
                                            <label className="form-check-label" htmlFor="likes_vk_post_people">????????</label>
                                        </div>
                                        <div className="form-group form-check">
                                            <input type="checkbox" className="form-check-input" id="likes_vk_post_groups" checked={account.likes_vk_post_groups} onChange={this.onChangeChecked}/>
                                            <label className="form-check-label" htmlFor="likes_vk_post_groups">????????????, ????????????????</label>
                                        </div>

                                    </div>
                                </div>
                                </fieldset>
                            </div>
                        </div>
                        <hr/>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="row mb-2">
                                    <div className="col-lg-12">

                                        {/* ?????????????????? ???????????? ???????????? */}
                                        <div className="d-flex justify-content-between">
                                         <div>
                                          <div className="custom-control custom-switch">
                                            <input type="checkbox" className="custom-control-input" id="likes_vk_friend_allowed" checked={account.likes_vk_friend_allowed} onChange={this.onChangeChecked}/>
                                            <label className="custom-control-label" htmlFor="likes_vk_friend_allowed"> <b>??????/???????? | ?????????????????????????????? ????????????</b></label>
                                          </div>
                                         </div>
                                         <div><span className="text-success"><strong>3</strong> zb&#162;</span><sub>/????????</sub></div>
                                        </div>

                                    </div>
                                </div>
                                <fieldset style={{display: (account.likes_vk_friend_allowed)? '' : 'none' }}>
                                <div className="row">
                                    <div className="col-lg-6">
                                        <small className="form-text text-muted">?????? ?????????????? ?</small>

                                            <div className="form-group form-check">
                                                <input type="checkbox" className="form-check-input" id="likes_vk_friend_post" checked readOnly/>
                                                <label className="form-check-label" htmlFor="likes_vk_friend_post">??????????</label>
                                                <small className="form-text text-muted">???????????? ??????????, ???????????????? ???? ??????????????????????</small>
                                            </div>

                                    </div>
                                    <div className="col-lg-6">
                                        <small className="form-text text-muted">???????? ?????????????? ?</small>

                                            <div className="form-group form-check">
                                                <input type="checkbox" className="form-check-input" id="likes_vk_friend_people" checked={account.likes_vk_friend_people} onChange={this.onChangeChecked}/>
                                                <label className="form-check-label" htmlFor="likes_vk_friend_people">????????</label>
                                            </div>
                                            <div className="form-group form-check">
                                                <input type="checkbox" className="form-check-input" id="likes_vk_friend_groups" checked={account.likes_vk_friend_groups} onChange={this.onChangeChecked}/>
                                                <label className="form-check-label" htmlFor="likes_vk_friend_groups">????????????, ????????????????</label>
                                            </div>

                                    </div>
                                </div>
                                </fieldset>
                            </div>
                        </div>
                        <hr/>
                        <p><b>?????????? ?????????????????? ????????????</b></p>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label htmlFor="likes_black_list">???????????? ????????????</label>
                                    <textarea className="form-control" rows="5" name="likes_black_list" value={account.likes_black_list} onChange={this.onChange}></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label htmlFor="likes_stop_words">???????? ??????????</label>
                                    <textarea className="form-control" rows="5" name="likes_stop_words" value={account.likes_stop_words} onChange={this.onChange}></textarea>
                                </div>
                            </div>
                        </div>
                    </form>
                    <a href="#" className="btn btn-primary" onClick={this.onSaveLikes}>??????????????????</a>
                </div>
            </div>
        )
    }


    viewFriendsSettings (account) {
        let ageAll = true;
        let ageIndicate = false;

        let sexAll = true;
        let sexMan = false;
        let sexWoman = false;

        //???????????????????????????? RADIO ???? ??????????
        if ((account.friends_age_use === true) || (account.friends_age_use === 1)) {
            ageAll = false;
            ageIndicate = true;
        }
        if (account.friends_sex === 'm') {
            sexAll = false;
            sexMan = true;
            sexWoman = false;
        }
        if (account.friends_sex === 'w') {
            sexAll = false;
            sexMan = false;
            sexWoman = true;
        }

        return (
            <div className="card">
                <div className="card-header d-flex justify-content-between">
                  <div>
                    <div className="custom-control custom-switch">
                        <input type="checkbox" className="custom-control-input" id="friends_allowed" checked={account.friends_allowed} onChange={this.onChangeChecked}/>
                        <label className="custom-control-label" htmlFor="friends_allowed"> <b>??????/???????? | ?????????????????? ???????????? ?? ????????????</b></label>
                    </div>
                  </div>
                  <div><span className="text-success"><strong>3</strong> zb&#162;</span><sub>/????????</sub></div>
                </div>

                <div className="card-body">
                    <form>
                        <fieldset style={{display: (account.friends_allowed)? '' : 'none' }}>
                        <h5 className="card-title">??????????????</h5>
                        <div className="form-row mb-4">
                            <div className="col-lg-4">
                                <div className="custom-control custom-radio">
                                    <input type="radio" id="ageAll" name="friends_age_use" value='0' className="custom-control-input" checked={ageAll} onChange={this.onChange}/>
                                    <label className="custom-control-label" htmlFor="ageAll">??????????</label>
                                </div>

                                <div className="custom-control custom-radio">
                                    <input type="radio" id="ageIndicate" name="friends_age_use" value='1' className="custom-control-input" checked={ageIndicate} onChange={this.onChange}/>
                                    <label className="custom-control-label" htmlFor="ageIndicate">??????????????</label>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <label className="sr-only" htmlFor="friends_age_from">????</label>
                                <div className="input-group mb-2">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">????</div>
                                    </div>
                                    <input type="text" className="form-control" id="friends_age_from" name="friends_age_from" value={account.friends_age_from} onChange={this.onChange}
                                           placeholder=""/>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <label className="sr-only" htmlFor="friends_age_to">????</label>
                                <div className="input-group mb-2">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">????</div>
                                    </div>
                                    <input type="text" className="form-control" id="friends_age_to" name="friends_age_to" value={account.friends_age_to} onChange={this.onChange}
                                           placeholder=""/>
                                </div>
                            </div>
                        </div>
                        <h5 className="card-title">??????</h5>
                        <div className="custom-control custom-radio">
                            <input type="radio" id="sexAll" name="friends_sex" value='' className="custom-control-input" checked={sexAll} onChange={this.onChange}/>
                            <label className="custom-control-label" htmlFor="sexAll">??????????</label>
                        </div>
                        <div className="custom-control custom-radio">
                            <input type="radio" id="sexMan" name="friends_sex" value='m' className="custom-control-input" checked={sexMan} onChange={this.onChange}/>
                                <label className="custom-control-label" htmlFor="sexMan">??????????????</label>
                        </div>
                        <div className="custom-control custom-radio mb-4">
                            <input type="radio" id="sexWoman" name="friends_sex" value='w' className="custom-control-input" checked={sexWoman} onChange={this.onChange}/>
                                <label className="custom-control-label" htmlFor="sexWoman">??????????????</label>
                        </div>
                        <h5 className="card-title">??????????????????????:</h5>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label>??????????</label>
                                    <textarea className="form-control" rows="5" name="friends_message" value={account.friends_message} onChange={this.onChange}></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label>????????????????????</label>
                                    <textarea className="form-control" rows="5" name="friends_message_subscriber" value={account.friends_message_subscriber} onChange={this.onChange}></textarea>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                    </form>
                    <a href="#" className="btn btn-primary" onClick={this.onSaveFriends}>??????????????????</a>
                </div>
            </div>
        );
    }

    viewBirthdaySettings (account) {

        if (!account.birthday_sentence) account.birthday_sentence = [''];
        if (typeof account.birthday_sentence === "string") account.birthday_sentence = JSON.parse(account.birthday_sentence);


        let bdList = account.birthday_sentence.map((item, index) => <div className="form-group" key={index}>
            <div className="d-flex justify-content-between">
                <label>{index + 1} ??????????????</label>
                    {index > 0?
                    <button type="button" className="close" aria-label="????????????" data-idx={index} onClick={this.onDeleteBirthday}>
                      <span aria-hidden="true">&times;</span>
                    </button>: null}
            </div>
            <textarea className="form-control" rows="5" name={"birthday_sentence"} value={item} data-idx={index} onChange={this.onChange}></textarea>
         </div>);

        return (
            <div className="card">
                <div className="card-header d-flex justify-content-between">
                    <div>
                        <div className="custom-control custom-switch">
                            <input type="checkbox" className="custom-control-input" id="birthday_allowed" checked={account.birthday_allowed} onChange={this.onChangeChecked}/>
                            <label className="custom-control-label" htmlFor="birthday_allowed"> <b>??????/???????? | ?????????????????????? ?? ???????? ????????????????</b></label>
                        </div>
                    </div>
                    <div><span className="text-success"><strong>3</strong> zb&#162;</span><sub>/????????</sub></div>
                </div>

                <div className="card-body">
                    <form>
                        <fieldset style={{display: (account.birthday_allowed)? '' : 'none' }}>
                            <h5 className="card-title">??????????????????</h5>

                            <div className="row">
                                <div className="col-lg-12">{bdList}</div>
                            </div>

                            <button type="button" className="d-block mb-2 btn btn-sm btn-success" onClick={this.onAddBirthday}>????????????????</button>
                        </fieldset>
                    </form>
                    <a href="#" className="btn btn-primary" onClick={this.onSaveBirthday}>??????????????????</a>
                </div>
            </div>
        );
    }

    viewLikesChatSettings (account) {
        let classNameAlert = 'alert alert-success';
        if (this.state.chatErr === true)
            classNameAlert = "alert alert-warning";

        let chatText = this.state.chatInfo;
        if (this.state.chatErr === false)
            chatText += `${this.state.chatCount} - ???? ???????????????????? ?????????????? ???? ????????????????????`;

        return (
            <div className="card">
                <div className="card-header">
                    <b>???????? ??????</b>
                </div>

                <div className="card-body">
                    <form>
                        {(this.state.chatErr !== null) ?
                            <div className={classNameAlert} role="alert">
                                {chatText}
                            </div> : null
                        }

                        <label htmlFor="chat_like_id">Id ???????????? (???????????????? <b>sel</b> ???? ???????????????? ???????????? ????????????????)</label>
                        <div className="input-group mb-2">
                            <div className="input-group-prepend">
                                <div className="input-group-text">sel</div>
                            </div>
                            <input type="text" className="form-control" id="chat_like_id" name="chat_like_id" value={account.chat_like_id} onChange={this.onChange} placeholder=""/>
                        </div>

                        <br/>
                        <div className="form-group">
                            <label htmlFor="chat_like_count">?????????????? ?????????????? ??????????????????</label>
                            <input type="email" className="form-control" id="chat_like_count" name="chat_like_count" value={account.chat_like_count} onChange={this.onChange}/>
                        </div>

                        <br/>
                        <div className="form-group">
                            <label htmlFor="chat_like_message">???????????? ???? ?????? ????????, ?????????????? ?????????? ???????????????? ?? ??????</label>
                            <input type="email" className="form-control" id="chat_like_message" name="chat_like_message" value={account.chat_like_message} onChange={this.onChange}/>
                        </div>

                    </form>
                    <br/>
                    <button type="submit" className="btn btn-primary" onClick={this.onChatPost}>?????????????????? ?? ??????</button>
                </div>
            </div>
        );
    }

    async onChatPost () {
        console.log('?????????????? ???????????????? ?? ??????????')

        if (this.state.chatCount>0)
            return false;

        try {
            await requestsVk.messages_getHistory(this, this.props.account);
            this.setState({chatInfo: `?????? ???????????????? ?? ??????????????: `, chatErr: false})
        } catch (err) {
            this.setState({chatInfo: err.msg, chatErr: true})

            setTimeout(() => {
                this.setState({chatInfo: ``, chatErr: null})
            }, 10000)
        }

    }

    //?????????????? ???????????? / ?????????????????? ??????????
    selectYes (account) {

        return (
            <div className="row">
                {this.viewAccountInfo(account)}
                {this.modalPay(account)}

                <div className="col-lg-8">
                    <a href={'https://money.yandex.ru/to/410018702407689'} type="button" className="btn btn-outline-success btn-block">???????????????????? ????????????</a>
                    <hr/>
                    {this.viewLikesSettings(account)}
                    <br/>
                    {this.viewFriendsSettings(account)}
                    <br/>
                    {this.viewBirthdaySettings(account)}
                    <br/>
                    {this.viewLikesChatSettings(account)}

                </div>
            </div>
        );
    }

    //?????????????? ???? ????????????
    selectNo () {
        return (
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h2>???????????????? ?????????????? ???? ????????????</h2>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        console.log('SocAccountSetting-render');
        return (
            (this.props.account) ? this.selectYes(this.props.account) : this.selectNo()
        );

    }

}

export default connect (
)(SocAccountSetting);