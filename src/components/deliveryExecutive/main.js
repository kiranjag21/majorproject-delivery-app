import { Component } from 'react';
import Pusher from 'pusher-js';
import axios from 'axios';
import PusherEvents from './pusher';
import ResponsiveDrawer from './sidebar';
import { Link, Route, Switch, withRouter } from 'react-router-dom';
import HomePage from './deliveryHome';
import LiveTasks from './liveTasks';
import DeliveryProfile from './deliveryProfile';
import DeliveryNotifications from './notifications';
import { addOrder, setConnection, disconnect } from '../redux/reduxActions';
import { connect } from 'react-redux';
import { baseUrl } from '../config';
import Graph from './graph';
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

class Main extends Component {

	constructor(props) {
		super(props);
		this.state = {
            orderInfo: null,
            renderComp: false,
			channel: null
		}

		this.disconnect = this.disconnect.bind(this);
	}
	componentDidMount() {
		window.addEventListener('beforeunload', this.disconnect);	
	console.log('user: ',this.props.auth.userId)
		
	
	}
	componentDidUpdate() {
		//console.log('user: ',this.props.auth.userId)
		
	}
	componentWillUnmount() {
		window.removeEventListener('beforeunload', this.disconnect);
    }
    
    disconnect () {
		this.props.connection.pusher.disconnect();
		console.log(this.props.connection.pusher)
		//this.props.disconnect();
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
			console.log('from server: ', response);
		})
		.catch((error) => console.log(error));
	
    }
    
	render() {
		console.log('redux: ', this.props.connection);
		return (
			<div className="container">
				{/* <Link to="/" >Home</Link><br></br>
                <Link to="/delnotifications" >notifications</Link><br></br>
                <Link to="/livetask" >live tasks</Link><br></br>
				<Link to="/history" >History</Link> */}
				<Switch>
					{/* <Route exact path="/" component={HomePage} /> */}
					<Route exact path="/livetask" component={LiveTasks} />
					<Route exact path="/history" component={() => <DeliveryProfile />} />
					{/* <Route exact path="/performance" component={Graph}/> */}
					<Route path="/" component={() => <DeliveryNotifications orderInfo={this.state.orderInfo} />} />
					
				</Switch>
			</div>
		);
	}

}



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
