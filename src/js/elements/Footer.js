import React, {Component} from 'react';
import {connect} from 'react-redux';

class Footer extends Component {
    constructor () {
        super();
    }

    render() {
        return (
            <footer className="footer p-3">
                <div className="container">
                    <div className="row">
                        <div className="col-md-auto col-sm-12">
                            <div className="row">
                                <span className="col-md-auto col-sm-6 mb-md-0 mb-sm-2">
                                <p>
                                    <a href="https://vk.com/sacredwings">Страница разботчика 😍</a>
                                </p>
                                <p>
                                    Для отзывов и предложений
                                </p>
                            </span>
                            </div>
                        </div>
                        <div className="col-md-auto col-sm-12 ml-auto">ZayeBot © 2020</div>
                    </div>
                </div>
            </footer>
        )
    }
}

export default connect (
    state => ({
    }),
    dispatch => ({
    })
)(Footer);