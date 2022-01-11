import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from "axios";
import store from "../store";

class Footer extends Component {
    constructor () {
        super();

        this.state = {
            info: null,
            err: false
        }

        this.delErr = this.delErr.bind(this)
    }

    delErr () {
        this.setState({info: null})
    }

    render() {
        axios.interceptors.response.use(
            response => {

                console.log(response.config)

                if (!response.config) return response;

                if (
                    (response.config.url !== '/api/like/edit') &&
                    (response.config.url !== '/api/friend/edit')
                ) return response;

                if (response.data.err) {
                    switch (response.data.err) {
                        case 200010000:
                            this.setState({err: true, info: response.data.msg})
                            break;

                        default: this.setState({err: true, info: 'Ошибка'})
                    }
                } else
                    this.setState({err: false, info: 'Сохранено'})

                setTimeout(()=>{
                    this.setState({err: false, info: ''})
                }, 3000);

                return response;
            },
            error => {

                return error;
            }
        );

        let img = {
            height: '20px'
        }
        let style = {
            position: 'relative',
        }

        let styleToast = {
            position: 'absolute',
            top: 20,
            right: 20,
            display: 'none',
            opacity: 0,
            zIndex: 100,
        }
        let classNameToast = "toast bg-success text-white";
        if (this.state.info) {
            styleToast.display = 'block';
            styleToast.opacity = 1;
        }
        if (this.state.err) {
            classNameToast = "toast bg-danger text-white";
        }

        console.log(styleToast)

        return (
            <div aria-live="polite" aria-atomic="true" style={style} >
                <div className={classNameToast} style={styleToast}>
                    <div className="toast-header">
                        <img src="ico.png" className="rounded mr-2" alt="..." style={img}/>
                        <strong className="mr-auto">Уведомление</strong>
                        <small></small>
                        <button type="button" className="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                            <span aria-hidden="true" onClick={this.delErr}>&times;</span>
                        </button>
                    </div>
                    <div className="toast-body">
                        {this.state.info}
                    </div>
                </div>
            </div>
        )
    }
}

export default connect ()(Footer);