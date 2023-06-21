import axios from 'axios';
import { Component } from 'react';
import { Card } from 'react-bootstrap';
import { baseUrl } from '../config';
import Graph from './graph';
import Rating from '@material-ui/lab/Rating';
import SimpleRating from './rating';
class DeliveryProfile extends Component {

	constructor(props) {
		super(props);

		this.state = {
			pastOrders: [],
			avgrate: 0,
			monthWiseAvgRate: []
		}
	}

	componentDidMount() {
		axios({
			method: 'GET',
			url: `${baseUrl}api/deliveryusers/history/${JSON.parse(localStorage.getItem('deliveryLogin')).userId}`,

		})
			.then((response) => {
				this.setState({
					pastOrders: response.data
				})
			})
			.catch((error) => console.log(error));

		axios({
			method: 'GET',
			url: `${baseUrl}api/deliveryusers/delaverage/${JSON.parse(localStorage.getItem('deliveryLogin')).userId}`,

		})
			.then((response) => {
				console.log('from server rating: ', response.data);
				this.setState({
					avgrate: response.data[0].avgrate
				})
			})
			.catch((error) => console.log(error));

		axios({
			method: 'GET',
			url: `${baseUrl}api/deliveryusers/delmonthavg/${JSON.parse(localStorage.getItem('deliveryLogin')).userId}`,

		})
			.then((response) => {
				this.setState({
					monthWiseAvgRate: response.data
				})
			})
			.catch((error) => console.log(error));
	}
	render() {
		return (
			<div className="container">
				<SimpleRating rating={this.state.avgrate} />
				<Graph monthWiseAvgRate={this.state.monthWiseAvgRate}/>


				<hr></hr>
				<h3>My past Orders</h3>
				{
					(this.state.pastOrders.length > 0) ?
					
						this.state.pastOrders.map(order => {
							return (
								<div style={{ display: 'flex', justifyContent: 'center' }}>
									<Card className="text-center" style={{ marginTop: '2%', width: "70%", Color: "black", backgroundColor: "#c3073f" }}>
										<Card.Header className="text-left" style={{ marginTop: '2%', width: "100%", backgroundColor: "#c3073f", color: "white" , fontFamily: 'poppins'}} as="h5">Order Id: {order.orderId}
										</Card.Header>
										<Card.Body className="text-left" style={{ marginTop: '2%', width: "100%", backgroundColor: "whitesmoke", color: "black", fontSize: "2rem", fontFamily: "cursive" }}>
											<h4 className="font-weight-bold">Restaurant details:
										<h5><br />
													<blockquote > {order.restName}</blockquote>
													<blockquote> {order.restAddress}</blockquote>
												</h5>
											</h4><hr></hr>
											<h4 className="font-weight-bold">Customer details:
										<h5><br />
													<blockquote> {order.userName}</blockquote>
													<blockquote> {order.userAddress}</blockquote>
												</h5>
											</h4>
										</Card.Body>
									</Card>
								</div>
							);
						})
						: <div>History is empty</div>
				}
			</div>
		);
	}

}

export default DeliveryProfile;
