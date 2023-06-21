import axios from 'axios';
import { Component } from 'react';
import { Button, Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ControlledAccordions from './statusCard';
import { orderPickup, addOrder, setConnection, disconnect, addLiveOrder, removeLiveOrder, removeOrder } from '../redux/reduxActions';
import { baseUrl } from '../config';
import NotificationsOffIcon from '@material-ui/icons/NotificationsOff';
const mapStateToProps = state => {
    return {
        connection: state.connection.connection,
        receivedOrders: state.receivedOrders.receivedOrders,
        liveOrders: state.liveOrders.liveOrders
    }
}
const mapDispatchToProps = (dispatch) => ({
    removeLiveOrder: (data) => dispatch(removeLiveOrder(data)),
    orderPickup: (data) => dispatch(orderPickup(data)),

});


class LiveTasks extends Component {

    constructor(props) {
        super(props);
    }
    handlePickup = (data) => {
        console.log('in pickup')
        this.props.orderPickup(data);
        
        axios({
            method: 'POST',
            url: `${baseUrl}orders/pickup`,
            // data: {
            //     name: JSON.parse(localStorage.getItem('deliveryLogin')).username,
            //     dId: JSON.parse(localStorage.getItem('deliveryLogin')).userId,
            //     orderInfo: data
            // }
        })
            .then((response) => {
                console.log('from server pickup status: ', response);
                
            })
            .catch((error) => console.log(error));
    }
    handleDelivered = (data) => {
        console.log('hi ', data)

        axios({
            method: 'POST',
            url: `${baseUrl}orders/delivered`,
            data: {
                name: JSON.parse(localStorage.getItem('deliveryLogin')).username,
                dId: JSON.parse(localStorage.getItem('deliveryLogin')).userId,
                orderInfo: data
            }
        })
            .then((response) => {
                console.log('from server: ', response);
                this.props.removeLiveOrder(data);
            })
            .catch((error) => console.log(error));
    }
    render() {
        return (
           <div className="container" style={{fontFamily:'poppins',marginTop:'2%',marginBottom:'2%'}}>
                {
                    this.props.liveOrders.length > 0 ?
                    this.props.liveOrders.map(order => {
                        return (
                            <Card style={{backgroundColor:'gray',marginTop:'2%',marginBottom:'2%'}}>
                                <Card.Header>Order Id: {order.uniqueId}</Card.Header>
                                <Card.Body>
                                    <Card.Title>From: {order.username}</Card.Title>
                                    <ControlledAccordions order={order} handlePickup={this.handlePickup} handleDelivered={this.handleDelivered} />
                                </Card.Body>
                            </Card>
                        );
                    })
                    :  <p className="lead">
                    No Live task availabel currently ! <p><NotificationsOffIcon /></p>
                </p>
                }

            </div>
        );
    }

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LiveTasks));
