import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Button } from 'react-bootstrap';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import { useRef } from 'react';
import { baseUrl } from '../config';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
        fontFamily:'poppins'
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    font:{
        fontFamily:'poppins'
    }
}));


export default function ControlledAccordions(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [pickupDone, setPickStatus] = React.useState(false);
    const [deliveryDone, setDelStatus] = React.useState(false);
    const [disable, setDisable] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const pickupComplete = (order) => {
        setPickStatus(true);
        setExpanded(false);
        setDisable(true);
        props.handlePickup(order);

        // Axios call to inform user about pickup completion.
    }
    const deliveryComplete = (order) => {
        setDelStatus(true);

        props.handleDelivered(order);
    }
    return (

        <div className={classes.root}>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary
                    expandIcon={props.order.pickstatus ? <CheckCircleOutlineIcon /> : <HourglassEmptyIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Typography className={classes.heading}>Step 1: Pickup order </Typography>
                </AccordionSummary>

                <div id="accordion">
                    <div class="card">
                    <div class="card-header" id="headingOne" style={{marginLeft:"2px",color:"white", fontSize:"2rem", backgroundColor: "#c3073f", fontFamily:"cursive"}}>
                            <h5 class="mb-0" style={{marginLeft:"2px", fontSize:"2rem", fontFamily:"poppins",backgroundColor: "#c3073f" }}>
                                Restaurant Details
                            </h5>
                        </div>
                        <div id="collapseOne" class="collapse show text-left" aria-labelledby="headingOne" data-parent="#accordion">
                            <div class="card-body">
                                <Typography className={classes.font} style={{ marginLeft: "2px" }}>
                                    <p>Restaurant Name:<br></br> <span  style={{ marginLeft: "2px" ,fontSize: "large", fontFamily:"cursive"}}>{props.order.restName}</span></p>
                                </Typography><br />

                                <Typography className={classes.font}>
                                    <p>Restaurant Address: <br></br> <span  style={{ marginLeft: "2px" ,fontSize: "large", fontFamily:"cursive"}}>{props.order.restAddress}</span></p>
                                </Typography><br />

                                <hr/>
                                <Typography className={classes.font}>
                                    <p><h6>List of Items</h6></p>
                                    <ul>
                                        {
                                            props.order.dishes.map(dish => {

                                                return (
                                                    <li  style={{ marginLeft: "2px" ,fontSize: "large", fontFamily:"cursive"}}>{dish.dishName} x {dish.quantity}</li>
                                                );


                                            })
                                        }
                                    </ul>
                                </Typography>
                            </div>
                        </div>
                        <Button className={classes.color} style={{backgroundColor:'green'}} disabled={props.order.pickstatus} onClick={() => pickupComplete(props.order)}>Pickup Complete</Button>

                    </div>
                </div>
            </Accordion>

            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary
                    expandIcon={<HourglassEmptyIcon />}
                    aria-controls="panel2bh-content"
                    id="panel2bh-header"
                >
                    <Typography className={classes.heading}>Step 2: Deliver order</Typography>

                </AccordionSummary>

                <div id="accordion">
                    <div class="card">
                    <div class="card-header" id="headingOne"style={{marginLeft:"2px",color:"black", fontSize:"35px", backgroundColor: "#c3073f", fontFamily:"cursive"}}>
                            <h5 class="mb-0"style={{marginLeft:"2px",color:"white", fontSize:"35px", fontFamily:"poppins", backgroundColor: "#c3073f"}}>
                             Customer Details
                            </h5>
                        </div>
                        <div id="collapseOne" class="collapse show text-left" aria-labelledby="headingOne" data-parent="#accordion">
                            <div class="card-body">
                            <Typography className={classes.font} style={{marginLeft:"2px", fontSize:"1rem"}} >
                                    <p>Customer Name: <br></br> <span  style={{ marginLeft: "2px" ,fontSize: "large", fontFamily:"cursive"}}>{props.order.username}</span>
                                        
                                    </p>
                                </Typography><br />

                                <Typography className={classes.font}>
                                    <p>Customer Address:  <br></br> <span  style={{ marginLeft: "2px" ,fontSize: "large", fontFamily:"cursive"}}>{props.order.userAddress}</span></p>
                                </Typography>
                                


                            </div>
                        </div>
                        <Button className={classes.color} style={{backgroundColor:'green'}} disabled={!props.order.pickstatus} onClick={() => deliveryComplete(props.order)}>Delivery Complete</Button>
                    </div>
                </div>
            </Accordion>

        </div>
    );
}
