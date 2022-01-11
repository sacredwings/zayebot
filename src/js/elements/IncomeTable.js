import React, {Component} from 'react';

class IncomeTable extends Component {
	render() {
		let data = this.props.data;
		let rows = null;

		if (data) {
			rows = data.map((item, index) => <IncomeTableRow key={index} data={item} />);
		} else {
			return (<p>Нет записей</p>);
		}

		return (
			<div className="overflow">
				<table className="table table-hover table-sm">
					<thead className="thead-light">
						<tr>
							<th scope="col">Дата</th>
							<th scope="col">Оплачено</th>
							<th scope="col">Сумма</th>
							<th scope="col">Статус</th>
						</tr>
					</thead>
					<tbody>{rows}</tbody>
				</table>
			</div>
		)
	}
}

class IncomeTableRow extends Component {
	constructor () {
		super();

		this.statuses = {
			'WAITING': 'Ожидание',
			'PAID': 'Успешно',
			'REJECTED': 'Отказ',
			'EXPIRED': 'Истек срок оплаты'
		};
	}

	render() {
		let data = this.props.data;

		return (
				<tr>
					<td>{data.create_date}</td>
					<td>{data.paid_date}</td>
					<td>{data.amount}</td>
					<td>{data.status === 'WAITING'? <a href={data.pay_url} target="_blank" rel="noopener noreferrer">{this.statuses[data.status]}</a> : this.statuses[data.status]}</td>
				</tr>
		)
	}
}

export default IncomeTable;
