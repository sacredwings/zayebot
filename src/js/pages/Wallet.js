import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import axios from 'axios';

class PageWallet extends Component {
	constructor () {
		super();

		this.state = {
			sum: 500,
			active: true
		};

		this.limit = 50000;

		this.onChange = this.onChange.bind(this);
		this.processData = this.processData.bind(this);
	}

	onChange(event) {
		let name = event.target.name;
		this.setState({[name]: event.target.value});
	}

	async processData(event) {
		event.preventDefault();

		let params = {
			sum: this.state.sum
		};

		this.setState({active: false});

		try {
			let result = await axios.post('/api/pay/prepaid', params, {withCredentials: true});
			this.setState({active: true});

			if (result.data.err !== 0)
				return;

			this.setState({sum: 0});

			// redirect to URL
			window.location.href = result.data.response;
		}
		catch (err) {}
	}

	render() {
		const {active} = this.state;

		return (
			<div className="container my-3">
				<form onSubmit={this.processData}>
					<fieldset disabled={!active}>
						<h2 className="mb-3">Пополнение кошелька</h2>

						<div className="form-row mb-2">
							<div className="col-lg-3 col-md-5 col-sm-6 col-xs-12 mb-2">
								<div className="input-group input-group-lg">
									<input type="number" max={this.limit} min="1" className="form-control" id="sum" name="sum" onChange={this.onChange} value={this.state.sum} placeholder="Сумма" />
								</div>
							</div>

							<div className="mb-2">
								<button type="submit" className="btn btn-lg btn-primary">Перейти к оплате</button>
							</div>
						</div>
					</fieldset>
				</form>

				<p>Внутренняя валюта 1 zb&#162; = 1 RUB</p>
				<p><Link to="/payments">История пополнений</Link></p>
			</div>
			);
	}
}

export default connect (
	state => ({

	}),
	dispatch => ({

	})
)(PageWallet);
