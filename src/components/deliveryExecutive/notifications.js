import { Component } from 'react';
import OutlinedCard from './Neworder';
import {
    Card, Button, CardHeader, CardFooter, CardBody,
    CardTitle, CardText
} from 'reactstrap';
import axios from 'axios';
import { Link, Route, Switch, withRouter } from 'react-router-dom';
import HomePage from './deliveryHome';
import { addOrder, setConnection, disconnect, addLiveOrder, removeLiveOrder, removeOrder } from '../redux/reduxActions';
import { connect } from 'react-redux';
import { baseUrl } from '../config';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import NotificationsOffIcon from '@material-ui/icons/NotificationsOff';
const theme = createMuiTheme();
const mapStateToProps = state => {
    return {
        connection: state.connection.connection,
        receivedOrders: state.receivedOrders.receivedOrders
    }
}
const mapDispatchToProps = (dispatch) => ({
    addOrder: (data) => dispatch(addOrder(data)),
    addLiveOrder: (data) => dispatch(addLiveOrder(data)),
    removeOrder: (data) => dispatch(removeOrder(data)),
    setConnection: (data) => dispatch(setConnection(data)),
    disconnect: () => dispatch(disconnect()),
});

class DeliveryNotifications extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }

        this.handleAccept = this.handleAccept.bind(this);
        this.handleReject = this.handleReject.bind(this);
        //this.handleDelivered = this.handleDelivered.bind(this);

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
    handleAccept(data) {
        console.log('accepted order : ', data)

        axios({
            method: 'POST',
            url: `${baseUrl}orders/accept`,
            data: {
                status: 1,
                name: JSON.parse(localStorage.getItem('deliveryLogin')).username,
                dId: JSON.parse(localStorage.getItem('deliveryLogin')).userId,
                orderInfo: data
            }
        })
            .then((response) => {
                console.log('from server: ', response);
                this.props.addLiveOrder(data);
                this.props.removeOrder(data);
            })
            .catch((error) => console.log(error));
    }
    handleReject(data) {
        axios({
            method: 'POST',
            url: `${baseUrl}orders/reject`,
            data: {
                status: 1,
                name: 'kiran',
                dId: this.props.connection.channel.name,
                orderInfo: data
            }

        })
            .then((response) => {
                console.log('from server: ', response);
                this.props.removeOrder(data);
            })
            .catch((error) => console.log(error));
    }
    // handleDelivered() {
    //     //console.log(this.props.channel.name);
    //     axios({
    //         method: 'POST',
    //         url: `${baseUrl}orders/delivered`,
    //         data: {
    //             name: JSON.parse(localStorage.getItem('deliveryLogin')).username,
    //             dId: JSON.parse(localStorage.getItem('deliveryLogin')).userId,
    //             orderInfo: this.props.orderInfo
    //         }
    //     })
    //         .then((response) => {
    //             console.log('from server: ', response);
    //         })
    //         .catch((error) => console.log(error));
    // }

    render() {
        console.log(this.props.receivedOrders)
        return (
            <div className="App">

                <HomePage />
                {
                    this.props.receivedOrders.length > 0 ?
                    this.props.receivedOrders.map(order => {
                        console.log('order: ', order)
                        return (
                            <OutlinedCard orderInfo={order} handleAccept={this.handleAccept} handleReject={this.handleReject} />
                        );
                    })
                    :
                    
                        <p className="lead" style={{ fontFamily: 'cursive'}}>
                            No upcoming Orders ! <p><NotificationsOffIcon /></p>
                        </p>
                
                }
            
               
            </div>
        );
    }


}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DeliveryNotifications));
