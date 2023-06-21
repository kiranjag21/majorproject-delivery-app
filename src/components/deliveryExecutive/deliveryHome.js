import { Component } from 'react';
import { baseUrl } from '../config';
import Switch from '@material-ui/core/Switch';
import { addOrder, setConnection, disconnect } from '../redux/reduxActions';
import { connect } from 'react-redux';
import axios from 'axios';
import Pusher from 'pusher-js';
import { withRouter } from 'react-router-dom';
import { FormControl, FormControlLabel, FormGroup } from '@material-ui/core';
import DeliveryHeroUnit from './hero';

const mapStateToProps = state => {
	return {
		connection: state.connection.connection,
		receivedOrders: state.receivedOrders,
		auth: state.auth
	}
}
const mapDispatchToProps = (dispatch) => ({
	addOrder: (data) => dispatch(addOrder(data)),
	setConnection: (data) => dispatch(setConnection(data)),
	disconnect: () => dispatch(disconnect()),
});
class HomePage extends Component {

	constructor(props) {
		super(props);

		this.state = {
			flag: false
		}
	}

	handleChange = (event) => {
		//this.setState({ ...state, [event.target.name]: event.target.checked });

		if (event.target.checked) {

			this.setState({ flag: true })
			var pusher, channel;
			//if(this.props.connection === null) {

			var pusher = new Pusher('153cf7f4abf2fc074dfb', {
				authEndpoint: `${baseUrl}pusher/auth`,
				cluster: 'ap2'
			});
			var myId = JSON.parse(localStorage.getItem('deliveryLogin')).userId;
			var channel = pusher.subscribe(`presence-channel-${myId}`);

			this.props.setConnection({ pusher: pusher, channel: channel });


			channel.bind('order-event', (data) => {
				// Accpet or Reject.

				this.props.addOrder(data);
				//alert('order Received: '+JSON.stringify(this.state.orderInfo));
			});

			//}
		}
		else {

			this.setState({ flag: false })

			if (this.props.connection !== null) {
				this.props.connection.pusher.disconnect();
				this.props.disconnect();
				axios({
					method: 'POST',
					url: `${baseUrl}orders/disconnect`,
					data: {
						status: 1,
						name: 'kiran',
						dId: this.props.connection.channel.name
					}
				})
					.then((response) => {
					})
					.catch((error) => console.log(error));
			}
		}
	};

	render() {
		return (
			<div className="container" >
				
				{
					localStorage.getItem('deliveryLogin') ?
					<div>
						<DeliveryHeroUnit />
						<FormControl component="fieldset">
							<FormGroup>
								<FormControlLabel
									
									control={<Switch
										checked={this.props.connection}
										onChange={this.handleChange}
										inputProps={{ 'aria-label': 'secondary checkbox' }}

									/>} label={<span style={{ fontFamily: 'cursive'}}>Ready to Deliver</span>}
								/>

							</FormGroup>
						</FormControl>
						</div>
						
						
						: null

				}


			</div>
		);
	}

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomePage));
