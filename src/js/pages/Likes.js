import React, {Component} from 'react';
import {connect} from 'react-redux';

class Vk extends Component {
    constructor () {
        super();
    }
    //https://oauth.vk.com/token?grant_type=password&client_id=2274003&client_secret=hHbZxrka2uZ6jB1inYsH&username=%D0%9B%D0%9E%D0%93%D0%98%D0%9D&password=%D0%9F%D0%90%D0%A0%D0%9E%D0%9B%D0%AC&captcha_key=q24yud&captcha_sid=656412648896
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-3">
                        Аккаунты
                        <f/>
                        {f}

                    </div>
                    <div className="col-lg-9">
                        <div className="row">
                            <div className="col-lg-3">
                                Страница

                            </div>
                            <div className="col-lg-9">
                                <div className="row">
                                    <div className="col-lg-12">

                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <form>
                                            <div className="form-group form-check">
                                                <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                                                <label className="form-check-label" htmlFor="exampleCheck1">Посты</label>
                                            </div>
                                            <div className="form-group form-check">
                                                <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                                                <label className="form-check-label" htmlFor="exampleCheck1">Фотки</label>
                                            </div>
                                        </form>
                                        <button type="submit" className="btn btn-primary">Submit</button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

function f() {
    return <div>test object</div>;
}



export default connect (
    state => ({

    })
)(Vk);

