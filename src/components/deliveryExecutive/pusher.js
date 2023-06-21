import { Component } from 'react';
import axios from 'axios';
import { baseUrl } from '../config';

class PusherEvents extends Component {

	constructor(props) {
		super(props);
		this.state = {
		}

		this.handleAccept = this.handleAccept.bind(this);
		this.handleReject = this.handleReject.bind(this);
		this.handleDelivered = this.handleDelivered.bind(this);
		
	}
	componentDidMount() {
		
	}
	componentWillUnmount() {
	}
	// disconnect () {
	// 	pusher.disconnect();
	// 	console.log(pusher)

	// 	axios({
	// 		method: 'POST',
	// 		url: '${baseUrl}orders/disconnect',
	// 		data: {
	// 			status: 1,
	// 			name: 'kiran',
	// 			dId: this.props.channel.name
	// 		}
	// 	})
	// 	.then((response) => {
	// 		console.log('from server: ', response);
	// 	})
	// 	.catch((error) => console.log(error));
	
	// }
	handleAccept() {

		axios({
			method: 'POST',
			url: `${baseUrl}orders/accept`,
			data: {
				status: 1,
				name: 'kiran',
				dId: this.props.channel.name,
				orderInfo: this.props.orderInfo
			}
		})
		.then((response) => {
			console.log('from server: ', response);
		})
		.catch((error) => console.log(error));
	}
	handleReject() {
		axios({
			method: 'POST',
			url: `${baseUrl}orders/reject`,
			data: {
				status: 0,
				name: 'kiran',
				dId: this.props.channel.name,
				orderInfo: this.props.orderInfo
			}
			
		})
		.then((response) => {
			console.log('from server: ', response);
		})
		.catch((error) => console.log(error));
	}
	handleDelivered() {
		console.log(this.props.channel.name);
		axios({
			method: 'POST',
			url: `${baseUrl}orders/delivered`,
			data: {
				name: 'Kiran',
				dId: this.props.channel.name,
				orderInfo: this.props.orderInfo
			}
		})
		.then((response) => {
			console.log('from server: ', response);
		})
		.catch((error) => console.log(error));
	}
	render() {
		return (
			<div className="App">
				<button onClick={this.handleAccept}>Accept</button>
				<button onClick={this.handleReject}>Reject</button>
				<button onClick={this.handleDelivered}>Delivered</button>
				<button onClick={this.disconnect}>Disconnect</button>

			</div>
		);
	}

}

export default PusherEvents;
