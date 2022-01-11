import React, {Component} from 'react';

class TransTable extends Component {
	render() {
		let data = this.props.data;
		let rows = null;

		if (data) {
			rows = data.map((item, index) => <TransTableRow key={index} data={item} />);
		} else {
			return (<p>Нет записей</p>);
		}

		return (
			<div className="overflow">
				<table className="table table-hover table-sm">
					<thead className="thead-light">
						<tr>
							<th scope="col">Дата</th>
							<th scope="col">Аккаунт</th>
							<th scope="col">Модуль</th>
							<th scope="col">Сумма</th>
						</tr>
					</thead>
					<tbody>{rows}</tbody>
				</table>
			</div>
		)
	}
}

class TransTableRow extends Component {
	render() {
		let data = this.props.data;

		return (
				<tr>
					<td>{data.create_date}</td>
					<td><a href={'https://vk.com/id' + data.soc_user_id} target="_blank">{data.name}</a></td>
					<td>{data.module}</td>
					<td>{data.amount}</td>
				</tr>
		)
	}
}

export default TransTable;
