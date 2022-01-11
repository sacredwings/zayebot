import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import TransTable from '../elements/TransTable';

class PageTransactions extends Component {
	constructor () {
		super();

		this.state = {
			offset: 0,
			sort: 'id',
			sortdir: 1,
			data: [],
			active: true
		};

		this.getData = this.getData.bind(this);
	}

	componentDidMount() {
		this.getData();
	}

	async getData() {
		let params = {
			offset: this.state.offset,
			sort: this.state.sort,
			sortdir: this.state.sortdir
		};

		this.setState({active: false});

		try {
			let result = await axios.get('/api/pay/transacts', {params: params, withCredentials: true});
			this.setState({active: true});

			if (result.data.err !== 0)
				return;

			let data = result.data.response;

			this.setState({data: data});
		}
		catch (err) {
			this.setState({active: true});
		}
	}

	render() {
		const {active, data} = this.state;

		return (
			<div className="container my-3">
				<div className="row">
					<div className="col">
						<h2 className="mb-3">Оплата модулей</h2>

						{active?
							<TransTable data={data} /> : 'Загрузка данных...'}
					</div>
				</div>
			</div>
			);
	}
}

export default connect (
	state => ({

	}),
	dispatch => ({

	})
)(PageTransactions);
